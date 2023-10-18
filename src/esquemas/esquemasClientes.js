const joi = require('joi');

const esquemaCliente = joi.object({
    nome: joi.string().required().max(150).messages({
        'string.base': 'O campo nome precisa conter apenas letras.',
        'string.max': 'O nome precisa conter no máximo 150 caracteres.',
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
    }),

    email: joi.string().required().email().messages({
        'string.base': 'O campo email precisa ter um formato válido.',
        'string.email': 'O campo email precisa ter um formato válido.',
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
    }),
    
    cpf: joi.string().required().length(11).messages({
        'string.base': 'O cpf precisa ter um formato válido.',
        'string.length': 'O cpf precisa conter exatamente 11 caracteres. Insira apenas números.',
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf é obrigatório.',
    }).transform((cpfInserido) => {
        return cpfInserido.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    })
});

module.exports = {
    esquemaCliente
}