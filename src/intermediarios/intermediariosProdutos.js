const knex = require('../conexao');

const verificarProdutoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'O id informado deve ser um número inteiro positivo.' })
        }

        const produtoExiste = await knex('produtos').where({ id: Number(id) }).first();

        if (!produtoExiste) {
            return res.status(404).json({ mensagem: 'Não há produto cadastrado com o id especificado.' });
        }

        req.produto = produtoExiste;

        next();

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

const validarPedido = async (req, res, next) => {
    const { pedido_produtos } = req.body;
    try {
        for (const produto of pedido_produtos) {
            const { produto_id, quantidade_produto } = produto;

            const produtoExiste = await knex('produtos').where('id', produto_id).first();

            if (!produtoExiste) {
                return res.status(400).json({ mensagem: 'Não há produto cadastrado com o ID especificado.' })
            }

            if (produtoExiste.quantidade_produto < quantidade_produto) {
                return res.status(400).json({ mensagem: 'Quantidade em estoque insuficiente.' })
            }
        }

        next();
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' })
    }
};

module.exports = {
    verificarProdutoPorId,
    validarPedido
}