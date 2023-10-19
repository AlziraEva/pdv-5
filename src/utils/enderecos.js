const axios = require('axios')

const apiViaCep = async (cep) => {
    try {
        const pegarCep = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`

        )
        return pegarCep.data
    } catch (error) {
        return console.error('Erro ao obter endereço via "API Via CEP".');
    }
}

const formatarEndereco = (cepDados) => {
    const {cep, logradouro, bairro, localidade, uf} = cepDados;

    const enderecoFormatado = {
        cep,
        rua: logradouro,
        numero: null,
        bairro,
        cidade: localidade,
        estado: uf
    }

    return enderecoFormatado;
}
module.exports = {
    apiViaCep,
    formatarEndereco
}