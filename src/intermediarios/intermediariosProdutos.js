const knex = require('../conexao');

const verificarProdutoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'O id informado deve ser um número inteiro positivo.' })
        }

        const produtoExiste = await knex('produtos').where({ id: Number(id) }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: 'Não há produto cadastrado com o id especificado.' });
        }

        req.produto = produtoExiste;

        next();

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

module.exports = {
    verificarProdutoPorId
}