const express = require('express')
const { cadastrarUsuario, efetuarLoginDoUsuario, detalharUsuario, editarUsuario } = require('./controladores/controladoresUsuarios')
const { listarCategorias } = require('./controladores/controladoresCategorias');
const { cadastrarProduto, excluirProduto } = require('./controladores/controladoresProdutos');
const { cadastrarCliente, editarCliente } = require('./controladores/controladoresClientes');
const { esquemaUsuario, esquemaLoginUsuario } = require('./esquemas/esquemasUsuario');
const { esquemaCliente } = require('./esquemas/esquemasClientes');
const { esquemaProduto } = require('./esquemas/esquemasProdutos');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const verificarLogin = require('./intermediarios/filtroLogin');
const campoUnicoCliente = require('./intermediarios/verificarClientes');




const rotas = express()

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarRequisicao(esquemaUsuario), cadastrarUsuario);
rotas.post('/login', validarRequisicao(esquemaLoginUsuario), efetuarLoginDoUsuario);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(esquemaUsuario), editarUsuario);
rotas.post('/produto', validarRequisicao(esquemaProduto), cadastrarProduto);
rotas.delete('/produto/:id', excluirProduto);
rotas.post('/cliente', validarRequisicao(esquemaCliente), campoUnicoCliente, cadastrarCliente)
rotas.put('/cliente/:id', validarRequisicao(esquemaCliente), campoUnicoCliente, editarCliente)

module.exports = rotas;