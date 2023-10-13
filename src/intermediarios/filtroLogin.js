const knex = require('../conexao');
const jwt = require('jsonwebtoken');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado.');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuarioLog = await knex('usuarios').where('id', id).first();

        if (!usuarioLog) {
            return res.status(404).json('Usuario não encontrado.');
        }

        const { senha, ...usuario } = usuarioLog;

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = verificarLogin;