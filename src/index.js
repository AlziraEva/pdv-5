require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    try {
        response.status(200).json({mensagem:"Servidor funcionando"});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({mensagem: "Erro interno do servidor."});
    }
})

app.listen(process.env.PORT);
