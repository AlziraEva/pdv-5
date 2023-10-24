const joi = require('joi');

const esquemaPedidos = joi.object({
    cliente_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório.',
        'number.base': 'O campo cliente_id precisa ser um número inteiro positivo.',
        'number.positive': 'O campo cliente_id precisa ser um número inteiro positivo.',
    }),

    observacao: joi.string().max(255).messages({
        'string.base': 'O campo observação precisa ter um formato válido.',
        'string.max': 'O campo observação precisa ter no máximo 255 caracteres.',
    }),

    pedido_produtos: joi.array().items(joi.object({
        produto_id: joi.number().integer().positive().required().messages({
            'any.required': 'O campo produto_id é obrigatório.',
            'number.base': 'O campo produto_id precisa ser um número inteiro positivo.',
            'number.positive': 'O campo produto_id precisa ser um número inteiro positivo.',
        }),
        quantidade_produto: joi.number().integer().positive().required().messages({
            'any.required': 'O campo quantidade_produto é obrigatório.',
            'number.base': 'O campo quantidade_produto precisa ser um número inteiro positivo.',
            'number.positive': 'O campo quantidade_produto precisa ser um número inteiro positivo.',
        }),
    })),

});

module.exports = {
    esquemaPedidos
}
