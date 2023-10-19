const knex = require('../conexao');
const { endereco, enderecoFormatado } = require('../utils/resolverEndereco')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const emailExiste = await knex('clientes').where({ email }).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        };

        const cpfExiste = await knex('clientes').where(cpf).first();

        if (cpfExiste) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' });
        };

        const dadosEndereco = endereco(cep)

        const obterEndereco = enderecoFormatado(dadosEndereco)

        const novoCliente = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep: obterEndereco.cep,
            rua: obterEndereco.logradouro,
            numero,
            bairro: obterEndereco.bairro,
            cidade: obterEndereco.uf,
            estado: obterEndereco.localidade
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
    const { id } = req.params
    try {
        const clienteExiste = await knex('clientes').where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        const emailExiste = await knex('clientes').where({ email }).whereNot({ id }).first();

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const cpfExiste = await knex('clientes').where(cpf).whereNot({ id }).first();

        if (cpfExiste) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado' });
        }

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

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes').select('*');

        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

const detalharCliente = async (req, res) => {
    const { id } = req.params

    try {
        const clienteEncontrado = await knex('clientes').where({ id }).first();

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        return res.status(200).json(clienteEncontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = {
    cadastrarCliente,
    editarCliente,
    listarClientes,
    detalharCliente
}