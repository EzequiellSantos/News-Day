import { cleanLocalStorage, inputElement, inputsChecks, pesquisaUser, teste } from "./index.js"

var date = new Date()
var day = date.getDate()
var mes = date.getMonth()
var ano = date.getFullYear()
var mesAtual = mes + 1
let dateToday = `${ano}-${mesAtual.toString().padStart(2, '0')}-${day-1}`

const keyAPI = '8164a1687d9e4d80a5901e71edaf039c'

// chamadas de  api

var url = ''

export function definirUrls(userSearch, search, result){  if(search == 'Palavra-Chave' ){
  
  if(search == 'Palavra-Chave')

    adequedUrlKeyWord(userSearch, result)
    updatePlaceHolder(search)

  }else if(search == 'Domínio'){

    adequarUrlDomain(userSearch, result)
    updatePlaceHolder(search)

  }

  chamarAPI(url)
  teste(search, result)
  
}

function adequedUrlKeyWord(userSearch, result){

  if(result == 'Data'){

    url = `https://newsapi.org/v2/everything?q=${userSearch}&from=${dateToday}&to=${dateToday}&sortBy=publishedAt&apiKey=${keyAPI}`

  } else if(result == 'Popularidade'){

    url = `https://newsapi.org/v2/everything?q=${userSearch}&sortBy=popularity&apiKey=${keyAPI}`

  } else if(result == 'Relevância'){

    url = `https://newsapi.org/v2/everything?q=${userSearch}&sortBy=relevancy&apiKey=${keyAPI}`

  } else if(result == 'Última-Hora'){

    url = `https://newsapi.org/v2/top-headlines?q=${userSearch}&apiKey=${keyAPI}`

  }

}

function adequarUrlDomain(userSearch, result){

  if(result == "Data"){

    url = `https://newsapi.org/v2/everything?domains=${userSearch}&from=${dateToday}&to=${dateToday}&sortBy=publishedAt&apiKey=${keyAPI}`

  } else if(result == 'Popularidade'){

    url = `https://newsapi.org/v2/everything?domains=${userSearch}&sortBy=popularity&apiKey=${keyAPI}`

  } else if(result == 'Relevância'){

    url = `https://newsapi.org/v2/everything?domains=${userSearch}&sortBy=relevancy&apiKey=${keyAPI}`

  } else if(result == 'Última-Hora'){

    url = `https://newsapi.org/v2/top-headlines?domains=${userSearch}&apiKey=${keyAPI}`

  }

}

export function updatePlaceHolder(valor){

  if(valor == 'Palavra-Chave'){

    input.placeholder = 'Palavra-Chave, ex: apple'

  } else if(valor == 'Domínio'){

    input.placeholder = 'Domínio, ex: bbc.com'

  }

}

/* chamarAPI(`https://newsapi.org/v2/top-headlines?q=${userSearch}&apiKey=${keyAPI}`) */


/* var country = 'br'
var categoria = 'technology'
var palavraChave = 'lula' //palavras chaves ou uma frase para pesquisar
const apiCountryURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${keyAPI}`
    const apiCategoriaURL = `https://newsapi.org/v2/top-headlines?sources=${categoria}&apiKey=${keyAPI}`
const apiPalavraURL = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${keyAPI}` */

export async function chamarAPI(apiURL){
    
    try{

      const response = await fetch(apiURL)

      if(response.ok){

        const dados = await response.json()
        console.log(dados)

      } else{

        if(response.status == 400){

          console.error('Não encontrado esse tipo de pesquisa')

        } else if(response.status == 429){

          console.error('Você Fez Muitas solicitações')

        } else if(response.status == 500){

          console.error('Nosso Provedor de Noticias Está com problemas')

        } else {
          console.log(response.status)
        }

      }


    } catch (error){

      console.log('Erro: ', error.message)

    }

} 


// mostrando ao usuário o seu critério de busca e a sua pesquisa inserida no input
export function checkPesquisa(){

  adequedFrontEnd(inputsChecks[0], inputsChecks[1])

  titleSearch.style.display = 'block'
  search.innerHTML = `${pesquisaUser}`
  searchChoice.innerHTML = `${busca}`
  resultChoice.innerHTML = `${resultado}`

}


// adequando o back-front

export let busca = ''
export let resultado = ''

export function adequedFrontEnd(search, results){



  switch(search){
    case 'checkPalavraChave':
      busca = 'Palavra-Chave'
      break

    case 'checkDominio':
      busca = 'Domínio'
      break
  }

  switch(results){
    case 'checkDate':
      resultado = 'Data'
      break
    
    case 'checkRelevance':
      resultado = 'Relevância'
      break
    
    case 'checkPopularity':
      resultado = 'Popularidade'
      break

    case 'checkTop':
      resultado = 'Última-Hora'
      break
  }

  input.value = ''
  updatePlaceHolder(busca)

}


// verificando se é a primeira visita do usuário na página

export let lastSearch = localStorage.getItem('lastSearch')
export let LastChoiceSearch = localStorage.getItem('LastChoiceSearch')
export let LastChoiceResult =  localStorage.getItem('LastChoiceResult') 
export let permissionUser = false

export function firstVisitUser(){
  
  if( lastSearch && LastChoiceSearch && LastChoiceResult && permissionUser){

    /* ativar os inputs presentes no Busca e Resultado, e fazer uma chamada a API */
    console.log('localStorage => ', lastSearch, busca, resultado)
    adequedFrontEnd(LastChoiceSearch, LastChoiceResult)

  } else{
    /* adicionar uma imagem de sem pesquisas no article SubContainer */
    console.log('Você não tem pesquisas recentes guardadas')
    cleanLocalStorage()
  }

}


