const knex = require('../conexao');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const novoProduto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
        }).returning('*');

        if (!novoProduto) {
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
        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first();

        if(!categoriaExiste){
            return res.status(404).json({ mensagem: 'Não há categoria cadastrada com o ID informado.'});
        }
    
        const produtoAtualizado = { descricao, quantidade_estoque, valor, categoria_id };
    
        const atualizacaoProduto = await knex('produtos').where({ id }).update(produtoAtualizado);

        if (!atualizacaoProduto){
            return res.status(400).json({ mensagem: 'O produto não foi atualizado.'});
        }

        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.'});

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.'});
    }
};

const listarProdutos = async (req, res) =>{
    const {categoria_id} = req.query;

    try{

        let consulta = knex('produtos').select('*');

        if(categoria_id){

            if (isNaN(categoria_id)){
                return res.status(400).json({ mensagem: 'Informe um ID válido. O ID deve ser um número.'})
            }

            const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first();

            if(!categoriaExiste){
                return res.status(404).json({ mensagem: 'Não há categoria cadastrada com o ID informado.'});
            }

            consulta = consulta.where({categoria_id}).first();
        }

        const listaProdutos = await consulta;

        return res.status(200).json(listaProdutos);

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
        await knex('produtos').where({id}).del();

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
    excluirProduto,    
}
