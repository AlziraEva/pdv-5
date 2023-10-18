const knex = require('../conexao');

const campoUnicoCliente = async (req, res) => {
    const { email, cpf } = req.body;

    try {
        const emailExiste = await knex('clientes').where(email).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const cpfExiste = await knex('clientes').where(cpf).first();

        if (cpfExiste) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' });
        }

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

module.exports = campoUnicoCliente
