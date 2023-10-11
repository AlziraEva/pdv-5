const bcrypt = require('bcrypt');
const knex = require('../conexao');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const emailExiste = await knex('usuarios').where({email}).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning('*');

        if(!novoUsuario[0]){
            return res.status(400).json('O usuário não foi cadastrado.');
        }

        return res.status(201).json(novoUsuario[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

const efetuarLoginDoUsuario = async(req, res) => {
    const { email, senha} = req.body;

    try {
        const usuario = await knex('usuarios').where({email}).first();

        if(!usuario){
            return res.status(401).json('Email e/ou senha inválidos.');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta){
            return res.status(401).json('Email e/ou senha inválidos.');
        }

        const token = jwt.sign({id: usuario.id }, process.env.JWT_SECRET, {expiresIn: '1h'} );

        const { senha: _, ...dadosUsuarioLogado } = usuario;

        return res.status(200).json({
            usuario: dadosUsuarioLogado,
            token
        });

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

module.exports = {
    cadastrarUsuario,
    efetuarLoginDoUsuario
}