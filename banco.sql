CREATE DATABASE pdv;

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL  
);

CREATE TABLE categorias(
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL
);
 
INSERT INTO categorias (descricao)
VALUES 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE produtos(
    id SERIAL PRIMARY KEY NOT NULL,
    descricao VARCHAR(150) NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id) NOT NULL
);

CREATE TABLE clientes(
    id SERIAL PRIMARY KEY NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cep VARCHAR(9),
    rua VARCHAR(100),
    numero VARCHAR(10) 
    bairro VARCHAR(30),
    cidade VARCHAR(30),
    estado VARCHAR(2)
);
