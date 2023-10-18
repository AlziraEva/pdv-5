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
}

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {

        const produto = await knex('produtos').where('id', id).first();

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        await knex('produtos').where({id}).del();

        return res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
}

const listarProduto = async (req, res) =>{
    const {id} = req.query;

    try{

        let consulta = knex('produtos').select('*');

        if(id){
            consulta = consulta.where({id}).first();
        }

        const produto = await consulta;

         return res.status(200).json(produto);

    } catch (error){
        return res.status(500).json({ mensagem: 'Erro interno no servidor.'});
    }
};

const detalharProduto = async (req, res) => {
    const {id} = req.params;

    try{
         const produto = await knex('produtos').where({id}).first();

         if(!produto){

            return res.status(400).json({ mensagem: 'Informe um ID de produto válido.'});

         } else{

         return res.status(200).json(produto);

         };

    } catch (error){
        return res.status(500).json({ mensagem: 'Erro interno no servidor.'})
    }
};

module.exports = {
    cadastrarProduto,
    excluirProduto,
    listarProduto,
    detalharProduto
}
