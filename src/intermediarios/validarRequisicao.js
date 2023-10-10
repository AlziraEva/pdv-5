const validarRequisicao = (joiSchema) => async (request, response, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.status(500).json({mensagem: "Erro interno do servidor."});
    }
}

module.exports = validarRequisicao;