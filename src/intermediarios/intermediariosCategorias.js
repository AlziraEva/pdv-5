const knex = require('../conexao');

const verificarCategoriaPorId = async (req, res, next) => {
    try {
        const categoria_id = req.body.categoria_id || req.query.categoria_id;

        if (categoria_id !== undefined) {
            if (isNaN(categoria_id)) {
                return res.status(400).json({ mensagem: 'O id da categoria deve ser um valor numérico.' });
            }

            const categoriaExiste = await knex('categorias').where({ id: Number(categoria_id) }).first();

            if (!categoriaExiste) {
                return res.status(404).json({ mensagem: 'Não há categoria cadastrada com o ID informado.' });
            }

            req.categoria = categoriaExiste;
        }

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
}

module.exports = {
    verificarCategoriaPorId,
}