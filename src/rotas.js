const express = require('express')
const { cadastrarUsuario, efetuarLoginDoUsuario, detalharUsuario, editarUsuario, categorias } = require('./controladores/usuarios')
const validarRequisicao = require('./intermediarios/validarRequisicao');
const { esquemaCadastroUsuario, esquemaLoginUsuario } = require('./esquemas/esquemasUsuario');
const verificarLogin = require('./intermediarios/filtroLogin');

const rotas = express()

rotas.get('/categoria', categorias);
rotas.post('/usuario', validarRequisicao(esquemaCadastroUsuario), cadastrarUsuario);
rotas.post('/login', validarRequisicao(esquemaLoginUsuario), efetuarLoginDoUsuario);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(esquemaCadastroUsuario), editarUsuario);


module.exports = rotas;