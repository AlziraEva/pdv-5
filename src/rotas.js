const express = require('express')
const { cadastrarUsuario, efetuarLoginDoUsuario, detalharUsuario, editarUsuario } = require('./controladores/controladoresUsuarios')
const { listarCategorias } = require('./controladores/controladoresCategorias');
const { esquemaCadastroUsuario, esquemaLoginUsuario } = require('./esquemas/esquemasUsuario');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const verificarLogin = require('./intermediarios/filtroLogin');


const rotas = express()

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarRequisicao(esquemaCadastroUsuario), cadastrarUsuario);
rotas.post('/login', validarRequisicao(esquemaLoginUsuario), efetuarLoginDoUsuario);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(esquemaCadastroUsuario), editarUsuario);


module.exports = rotas;