const knex = require('../conexao');
const { apiViaCep, formatarEndereco } = require('../utils/apiViaCep')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;


    try {  
        let dadosCliente = {nome, email, cpf, cep, rua, numero, bairro, cidade, estado};

        if (cep){
            dadosCliente = await complementarEnderecoViaCep(cep, dadosCliente);
        }
        
        const cadastroCliente = await knex('clientes').insert(dadosCliente);


        if (!cadastroCliente) {
            return res.status(400).json({ mensagem: 'O cliente não foi cadastrado.' });
        }

        return res.status(201).json({ 
            mensagem: 'O cliente foi cadastrado com sucesso.', 
            "dados cadastrados": dadosCliente 
        });


    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

const editarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    const { id } = req.params;

    try {
        let dadosCliente = {nome, email, cpf, cep, rua, numero, bairro, cidade, estado};

        if(cep){
            dadosCliente = await complementarEnderecoViaCep(cep, dadosCliente);
        }

        const atualizacaoCliente = await knex('clientes').where({ id }).update(dadosCliente).returning('*');

        if (!atualizacaoCliente[0]) {
            return res.status(400).json({ mensagem: 'O cliente não foi atualizado.' });
        }

        return res.status(200).json({
            mensagem: 'O cliente foi atualizado com sucesso.', 
            "dados atualizados": atualizacaoCliente[0] 
        });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes').select('*').orderBy('id');

        if(!clientes[0]){
            return res.status(200).json({ mensagem: 'Ainda não há clientes cadastrados no sistema.'})
        }

        return res.status(200).json(clientes);
    } catch (error) {
        console.log(error.message)
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