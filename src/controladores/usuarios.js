const bcrypt = require('bcrypt')
const knex = require('../conexao')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        const emailExiste = await knex('usuarios').where('email', email);

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        })

        return res.status(201).json(novoUsuario)

    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = {
    cadastrarUsuario
}