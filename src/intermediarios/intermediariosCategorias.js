const knex = require('../conexao');

const verificarCategoriaPorId = async (req, res, next) => {
    const { categoria_id } = req.body;

    try {
        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first();

        if(!categoriaExiste){
            return res.status(404).json({ mensagem: 'Não há categoria cadastrada com o ID informado.'});
        }

        next();
        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.'});
    } 
}

module.exports = {
    verificarCategoriaPorId,
}