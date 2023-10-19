const axios = require('axios')

const endereco = async (cep) => {
    try {
        const pegarCep = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`
        )
        return response.data
    } catch (error) {

    }
}

const enderecoFormatado = (cepDados) => {
    return `${cepDados.logradouro}, 
    ${cepDados.bairro}, 
    ${cepDados.localidade},
    ${cepDados.uf},
    ${cepDados.cep}`
}
module.exports = {
    endereco,
    enderecoFormatado
}