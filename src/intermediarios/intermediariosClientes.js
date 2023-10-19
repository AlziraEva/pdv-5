const knex = require('knex');

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

    if (isNaN(id)){
        return res.status(400).json({ mensagem: 'Informe um ID válido. O ID deve ser um número.'})
    }

    const clienteExiste = await knex('clientes').where({ id }).first();

    if (!clienteExiste) {
        return res.status(404).json({ mensagem: 'Não há cliente cadastrado com o ID especificado.' });
    }

    req.cliente = clienteExiste;
    
    next();
};

module.exports = {
    verificarDuplicidadeEmailCpf,
    verificarClientePorId
}