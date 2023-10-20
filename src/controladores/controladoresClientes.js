const knex = require('../conexao');
const { apiViaCep, formatarEndereco } = require('../utils/enderecos')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    const camposPermitidos = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'];

    try {
        let novoCliente = { nome, email, cpf };

        if (cep) {
            const dadosEndereco = await apiViaCep(cep)

            const endereco = formatarEndereco(dadosEndereco)

            novoCliente = { ...novoCliente, ...endereco };

            if (numero) {
                novoCliente['numero'] = numero;
            };
            if (rua) {
                novoCliente['rua'] = rua;
            };
            if (bairro) {
                novoCliente['bairro'] = bairro;
            };
            if (cidade) {
                novoCliente['cidade'] = cidade;
            };
            if (estado) {
                novoCliente['estado'] = estado;
            };

        }

        const camposOpcionais = { rua, numero, bairro, cidade, estado }

        for (const campo in camposOpcionais) {
            if (camposPermitidos.includes(campo) && camposOpcionais[campo] !== undefined) {
                novoCliente[campo] = camposOpcionais[campo];
            }
        }

        const cadastroCliente = await knex('clientes').insert(novoCliente).returning('*');

        if (!cadastroCliente) {
            return res.status(400).json({ mensagem: 'O cliente não foi cadastrado.' });
        }

        return res.status(201).json(cadastroCliente);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

const editarCliente = async (req, res) => {
    const { nome, email, cpf, ...camposOpcionais } = req.body;
    const { id } = req.params;

    const camposPermitidos = ['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'];

    try {
        const clienteAtualizado = { nome, email, cpf };

        for (const campo in camposOpcionais) {
            if (camposPermitidos.includes(campo) && camposOpcionais[campo] !== undefined) {
                clienteAtualizado[campo] = camposOpcionais[campo];
            }
        }

        const atualizacaoCliente = await knex('clientes').where({ id }).update(clienteAtualizado);

        if (!atualizacaoCliente) {
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
    const { cliente } = req;

    try {
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

module.exports = {
    cadastrarCliente,
    editarCliente,
    listarClientes,
    detalharCliente
}