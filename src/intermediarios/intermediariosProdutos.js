const knex = require('knex');

const verificarProdutoPorId = async (req, res, next) => {

    const { id } = req.params;

    const produtoExiste = await knex('produtos').where({ id }).first();

    if (!produtoExiste) {
        return res.status(404).json({ mensagem: 'Não há produto cadastrado com o id especificado.' });
    }

    req.produto = produtoExiste;
    
    next();
};

module.exports = {
    verificarProdutoPorId,
}