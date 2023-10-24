const axios = require('axios');

const complementarEnderecoViaCep = async (cep, dadosCliente) => {
    try {
        const pegarCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const dadosCep = pegarCep.data;

        const { logradouro, bairro, localidade, uf } = dadosCep;

        const enderecoFormatado = {
            cep,
            rua: logradouro,
            numero: null,
            bairro,
            cidade: localidade,
            estado: uf
        }
    
        for (const campo of ['rua', 'bairro', 'cidade', 'estado']){
            if (dadosCliente[campo] === undefined){
                dadosCliente[campo] = enderecoFormatado[campo];
            }
        }

        return dadosCliente;
    } catch (error) {
        return console.error('Erro ao obter endereço via "API Via CEP".');
    }
}


module.exports = {
    complementarEnderecoViaCep
}