const axios = require('axios')

const endereco = async (cep) => {
    try {
        const pegarCep = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`

        )
        return pegarCep.data
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
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