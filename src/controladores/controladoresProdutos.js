const knex = require('../conexao');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const dadosProduto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
        }).returning('*');

        if (!dadosProduto[0]) {
            return res.status(400).json({ mensagem: 'O produto não foi cadastrado.' });
        }

        return res.status(201).json({ mensagem: 'O produto foi cadastrado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;
  
    try {
        const dadosProduto = { descricao, quantidade_estoque, valor, categoria_id };
    
        const atualizacaoProduto = await knex('produtos').where({ id }).update(dadosProduto).returning('*');

        if (!atualizacaoProduto[0]){
            return res.status(400).json({ mensagem: 'O produto não foi atualizado.'});
        }
        
        return res.status(200).json({ 
            mensagem: 'Produto atualizado com sucesso.',
            "dados atualizados": dadosProduto
        });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.'});
    }
};

const listarProdutos = async (req, res) =>{
    const { categoria } = req;

    try{
        let consulta = knex('produtos').select('*'); 

        if(categoria){
            consulta = consulta.where({categoria_id: categoria.id});
        }

        const listaProdutos = await consulta.orderBy('id');

        let mensagem;

        if (!listaProdutos[0]){
            mensagem = `Não existem produtos cadastrados na categoria ${req.categoria.descricao}.`;
            return res.status(404).json({ mensagem })
        }

        return res.status(200).json(categoria ? { categoria: req.categoria.descricao, listaProdutos} : listaProdutos);

    } catch (error){
        return res.status(500).json({ mensagem: 'Erro interno no servidor.'});
    }
};

const detalharProduto = async (req, res) => {

    return res.status(200).json(req.produto);
};

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoExcluido = await knex('produtos').where({ id }).del().returning('*');

        return res.status(200).json({ mensagem: 'Produto excluído com sucesso.', produtoExcluido: produtoExcluido[0] });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    excluirProduto,    
}
