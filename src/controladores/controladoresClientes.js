const knex = require('../conexao');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const novoCliente = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        });

        if (!novoCliente) {
            return res.status(400).json({ mensagem: 'O cliente não foi cadastrado.' });
        }

        return res.status(201).json({ mensagem: 'O cliente foi cadastrado.' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

const editarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    try {

        const atualizarCliente = await knex('clientes').where({ id }).update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        });

        if (!atualizarCliente) {
            return res.status(400).json({ mensagem: 'O cliente não foi atualizado.' });
        }

        return res.status(200).json({ mensagem: 'Dados do cliente atualizados com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

module.exports = {
    cadastrarCliente,
    editarCliente
}