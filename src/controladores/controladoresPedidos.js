const knex = require('../conexao');
const { construirMensagem } = require('../utils/emailMensagem');
const send = require('../utils/nodemailer');

const cadastrarPedido = async(req, res) => {
    const {cliente_id, observacao, pedido_produtos} = req.body;

    try{
        await knex.transaction(async (trx) =>{
            const [pedido_id] = await trx('pedidos').insert({
                cliente_id,
                observacao,
                valor_total: 0
            }).returning('id');
      

            let valorTotalPedido = 0;
            let produtoExiste;

            for (const produto of pedido_produtos){
                const {produto_id, quantidade_produto} = produto;

                produtoExiste = await trx('produtos').where('id', produto_id).first();

                await trx('pedido_produtos').insert({
                    pedido_id: pedido_id.id,
                    produto_id,
                    quantidade_produto,
                    valor_produto: produtoExiste.valor
                });

                valorTotalPedido += produtoExiste.valor * quantidade_produto;

                await trx('produtos').where('id', produto_id).decrement('quantidade_estoque', quantidade_produto);
            };

            await trx('pedidos').where('id', pedido_id.id).update({ valor_total: valorTotalPedido});

            const emailCliente = await knex('clientes').select('email').where('id',cliente_id).first();

            const mensagemEmail = construirMensagem(pedido_id.id, valorTotalPedido, pedido_produtos, produtoExiste);
    
            await send(emailCliente.email, 'Seu pedido foi realizado!', mensagemEmail);
    

            return res.status(201).json({ mensagem: `Pedido de número ${pedido_id.id} cadastrado com sucesso!`})
        });
    } catch(error){
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor.'})
    }
};

module.exports = {
    cadastrarPedido
}