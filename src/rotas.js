const express = require('express')
const { cadastrarUsuario, efetuarLoginDoUsuario } = require('./controladores/usuarios')
const validarRequisicao = require('./intermediarios/validarRequisicao');
const { esquemaCadastroUsuario, esquemaLoginUsuario } = require('./esquemas/esquemasUsuario');

const rotas = express()

rotas.post('/usuario', validarRequisicao(esquemaCadastroUsuario), cadastrarUsuario);
rotas.post('/login', validarRequisicao(esquemaLoginUsuario), efetuarLoginDoUsuario);

module.exports = rotas;