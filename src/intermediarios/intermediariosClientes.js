const knex = require('../conexao');

const verificarDuplicidadeEmailCpf = async (req, res, next) => {

    const { email, cpf} = req.body;
    const { id } = req.params;
    let consultaEmail = knex('clientes').where({ email });
    let consultaCpf = knex('clientes').where({ cpf });

    if (id){
        consultaEmail = consultaEmail.whereNot({ id });
        consultaCpf = consultaCpf.whereNot({ id });
    }

    const emailExiste = await consultaEmail.first();

    if (emailExiste){
        return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    const cpfExiste = await consultaCpf.first();

    if (cpfExiste){
        return res.status(400).json({ mensagem: 'Cpf já cadastrado'});
    }

    next();
};

const verificarClientePorId = async (req, res, next) => {
    
    const { id } = req.params;
    const {cliente_id} = req.body;

    if(id !== undefined){
        if(isNaN(id)){
            return res.status(400).json({ mensagem: 'O id informado deve ser um número inteiro positivo.'})
        }

        const clienteExiste = await knex('clientes').where({ id }).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Não há cliente cadastrado com o ID especificado.' });
        }

        req.cliente = clienteExiste;  

    }

    if(cliente_id !== undefined){
        if(isNaN(cliente_id)){
            return res.status(400).json({ mensagem: 'O id informado deve ser um número inteiro positivo.'})
        }

        const clienteExiste = await knex('clientes').where('id', cliente_id ).first();

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Não há cliente cadastrado com o ID especificado.' });
        }

        req.cliente = clienteExiste;  
    }
    next();
};

module.exports = {
    verificarDuplicidadeEmailCpf,
    verificarClientePorId
}