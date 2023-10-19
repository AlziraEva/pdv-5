const express = require('express');
const { listarCategorias } = require('./controladores/controladoresCategorias');
const { cadastrarUsuario, efetuarLoginDoUsuario, detalharUsuario, editarUsuario } = require('./controladores/controladoresUsuarios');
const { cadastrarProduto, excluirProduto, detalharProduto, listarProdutos, editarProduto } = require('./controladores/controladoresProdutos');
const { cadastrarCliente, editarCliente, listarClientes, detalharCliente } = require('./controladores/controladoresClientes');
const { esquemaUsuario, esquemaLoginUsuario } = require('./esquemas/esquemasUsuarios');
const { esquemaProdutos } = require('./esquemas/esquemasProdutos');
const { esquemaCliente } = require('./esquemas/esquemasClientes');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const { verificarLogin } = require('./intermediarios/verificarLogin');
const { verificarCategoriaPorId } = require('./intermediarios/intermediariosCategorias');
const { verificarProdutoPorId } = require('./intermediarios/intermediariosProdutos');
const { verificarDuplicidadeEmailCpf, verificarClientePorId } = require('./intermediarios/intermediariosClientes');


const rotas = express();

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarRequisicao(esquemaUsuario), cadastrarUsuario);
rotas.post('/login', validarRequisicao(esquemaLoginUsuario), efetuarLoginDoUsuario);

rotas.use(verificarLogin);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(esquemaUsuario), editarUsuario);

rotas.post('/produto', validarRequisicao(esquemaProdutos), verificarCategoriaPorId, cadastrarProduto);
rotas.put('/produto/:id', verificarProdutoPorId, validarRequisicao(esquemaProdutos), verificarCategoriaPorId, editarProduto);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', verificarProdutoPorId, detalharProduto);
rotas.delete('/produto/:id', verificarProdutoPorId, excluirProduto);

rotas.post('/cliente', validarRequisicao(esquemaCliente), verificarDuplicidadeEmailCpf, cadastrarCliente);
rotas.put('/cliente/:id', verificarClientePorId, validarRequisicao(esquemaCliente), verificarDuplicidadeEmailCpf, editarCliente);
rotas.get('/cliente', listarClientes);
rotas.get('/cliente/:id', verificarClientePorId, detalharCliente);

module.exports = rotas;