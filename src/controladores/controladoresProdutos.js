const knex = require('../conexao');
const { carregarImagem, excluirImagem } = require('../serviços/backblazeAwsS3')

const cadastrarProduto = async (req, res) => {
    try {
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

        let dadosProduto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
        }).returning('*');

        if (!dadosProduto[0]) {
            return res.status(400).json({ mensagem: 'O produto não foi cadastrado.' });
        }

        if (req.file) {
            const id = dadosProduto[0].id
            const { originalname, mimetype, buffer } = req.file;

            const imagem = await carregarImagem(
                `produtos/${id}/${originalname}`,
                buffer,
                mimetype
            )

            dadosProduto = await knex('produtos').update({ produto_imagem: imagem.caminho }).where({ id }).returning('*')

            dadosProduto[0].produto_imagem = imagem.url;
        }

        return res.status(201).json({ mensagem: 'O produto foi cadastrado com sucesso.', dados_produto: dadosProduto[0] });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

const editarProduto = async (req, res) => {
    try {
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
        const { id } = req.produto;
        let dadosProduto = { descricao, quantidade_estoque, valor, categoria_id };

        const atualizacaoProduto = await knex('produtos').where({ id }).update(dadosProduto).returning('*');

        if (!atualizacaoProduto[0]) {
            return res.status(400).json({ mensagem: 'O produto não foi atualizado.' });
        }

        if (req.file) {
            const { originalname, mimetype, buffer } = req.file;

            const imagem = await carregarImagem(
                `produtos/${id}/${originalname}`,
                buffer,
                mimetype
            )

            if (req.produto.produto_imagem) {
                await excluirImagem(req.produto.produto_imagem)
            }

            dadosProduto = await knex('produtos').update({ produto_imagem: imagem.caminho }).where({ id }).returning('*')

            dadosProduto[0].produto_imagem = imagem.url;
        }

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso.',
            "dados atualizados": dadosProduto[0]
        });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

const listarProdutos = async (req, res) => {
    try {
        const { categoria } = req;
        let consulta = knex('produtos').select('*');

        if (categoria) {
            consulta = consulta.where({ categoria_id: categoria.id });
        }

        const listaProdutos = await consulta.orderBy('id');

        let mensagem;

        if (!listaProdutos[0]) {
            mensagem = `Não existem produtos cadastrados na categoria ${req.categoria.descricao}.`;
            return res.status(404).json({ mensagem })
        }

        return res.status(200).json(categoria ? { categoria: req.categoria.descricao, listaProdutos } : listaProdutos);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

const detalharProduto = async (req, res) => {
    return res.status(200).json(req.produto);
};

const excluirProduto = async (req, res) => {
    try {
        const { id } = req.params;

        const produtoExcluido = await knex('produtos').where({ id }).del().returning('*');

        if (!produtoExcluido[0]) {
            return res.status(400).json({ mensagem: 'O produto não foi excluído.' });
        }

        if (produtoExcluido[0].produto_imagem) {
            await excluirImagem(produtoExcluido[0].produto_imagem)
        }

        return res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    excluirProduto
}
