export async function chamarApi(busca, resposta) {
    
    try{

      const response = await fetch(apiCountryURL)

      if(response.ok){

        const dados = await response.json()
        console.log(dados)

      } else{

        alert('Erro: ', response.status)

      }


    } catch (error){

      alert('Erro: ', error.mensage)

    }

}

var date = new Date()
var day = date.getDate()
var mes = date.getMonth()
var mesAtual = mes + 1

const keyAPI = '8164a1687d9e4d80a5901e71edaf039c'

// para noticias atuais de um país ou categoria
var country = 'br'
var categoria = 'technology'
var q = 'lula' //palavras chaves ou uma frase para pesquisar
const apiCountryURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${keyAPI}`
/*     const apiCategoriaURL = `https://newsapi.org/v2/top-headlines?sources=${categoria}&apiKey=${keyAPI}`
const apiPalavraURL = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${keyAPI}` */