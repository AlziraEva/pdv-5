const express = require('express')
const { cadastrarUsuario, efetuarLoginDoUsuario, detalharUsuario, editarUsuario } = require('./controladores/controladoresUsuarios')
const { listarCategorias } = require('./controladores/controladoresCategorias');
const { esquemaUsuario, esquemaLoginUsuario } = require('./esquemas/esquemasUsuario');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const verificarLogin = require('./intermediarios/filtroLogin');
const { cadastrarCliente, editarCliente } = require('./controladores/controladoresClientes');
const { esquemaCliente } = require('./esquemas/esquemasClientes');
const { campoUnicoCliente } = require('./intermediarios/verificarClientes');

const rotas = express()

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarRequisicao(esquemaUsuario), cadastrarUsuario);
rotas.post('/login', validarRequisicao(esquemaLoginUsuario), efetuarLoginDoUsuario);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(esquemaUsuario), editarUsuario);

rotas.post('/cliente', validarRequisicao(esquemaCliente), campoUnicoCliente, cadastrarCliente)
rotas.put('/cliente/:id', validarRequisicao(esquemaCliente), campoUnicoCliente, editarCliente)

module.exports = rotas;