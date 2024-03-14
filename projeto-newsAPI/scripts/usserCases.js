import { cleanLocalStorage, inputsChecks, pesquisaUser, teste } from "./index.js"

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

export async function chamarApi(userSearch, search, result) {
    
    /*try{

       const response = await fetch(apiCountryURL)

      if(response.ok){

        const dados = await response.json()
        console.log(dados)

      } else{

        alert('Erro: ', response.status)

      }


    } catch (error){

      alert('Erro: ', error.mensage)

    } */

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

let busca = ''
let resultado = ''

export function adequedFrontEnd(search, results){


  switch(search){
    case 'checkPalavraChave':
      busca = 'Palavra-Chave'
      break

    case 'checkDominio':
      busca = 'Domínio'
      break
    
    case 'checkLanguage':
      busca = 'Língua'
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
  }

}


// verificando se é a primeira visita do usuário na página

export let lastSearch = localStorage.getItem('lastSearch')
export let LastChoiceSearch = localStorage.getItem('LastChoiceSearch')
export let LastChoiceResult =  localStorage.getItem('LastChoiceResult') 

export function firstVisitUser(){
  
  if( lastSearch && LastChoiceSearch && LastChoiceResult ){

    console.log(lastSearch, busca, resultado)

  } else{
    teste('você não possui pesquisas recentes')
  }

}



