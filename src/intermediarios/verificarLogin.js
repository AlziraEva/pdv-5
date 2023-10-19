const knex = require('../conexao');
const jwt = require('jsonwebtoken');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Acesso não autorizado. Efetue o login.' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuarioLogado = await knex('usuarios').where({id}).first();

        if (!usuarioLogado) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado.' });
        }

        const { senha, ...usuario } = usuarioLogado;

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = verificarLogin;