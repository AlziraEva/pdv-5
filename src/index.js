require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    try {
        console.log("Servidor funcionando");  
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(process.env.PORT);
