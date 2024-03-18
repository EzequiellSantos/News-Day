import { cleanLocalStorage, inputElement, inputsChecks, pesquisaUser, teste, tittleContainer } from "./index.js"

var date = new Date()
var day = date.getDate()
var mes = date.getMonth()
var ano = date.getFullYear()
var mesAtual = mes + 1
let dateToday = `${ano}-${mesAtual.toString().padStart(2, '0')}-${day-1}`

const keyAPI = '8164a1687d9e4d80a5901e71edaf039c'

// chamadas de  api

var url = ''

export function definirUrls(userSearch, search, result){
  
  if(search == 'Palavra-Chave'){

    adequedUrlKeyWord(userSearch, result)

  }else if(search == 'Domínio'){

    adequarUrlDomain(userSearch, result)

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


export let sucessResult = null

export async function chamarAPI(apiURL){
    
    try{

      const response = await fetch(apiURL)

      if(response.ok){

        const dados = await response.json()
        consumirDados(dados)
        console.log(dados)
        sucessResult = true

      } else{

        sucessResult = false

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

export let artigos = {

  manchetes: {

    url: [],
    urlImage: [],
    font: [],
    data: [],
    autor: [],
    titulo: [],
    descricao: [],
    texto: []

  }


}

let quantidArtigos = 0

async function consumirDados(dados){

  quantidArtigos = await dados.articles.length >= 2 ? 2 : dados.articles.length
  
  for(let t = 0 ; t <= quantidArtigos ; t++){


    artigos.manchetes.autor.push(dados.articles[t].author)

    artigos.manchetes.url.push(dados.articles[t].url)

    artigos.manchetes.urlImage.push(dados.articles[t].urlToImage)

    artigos.manchetes.font.push(dados.articles[t].source.name)

    artigos.manchetes.titulo.push(dados.articles[t].title)

    artigos.manchetes.descricao.push(dados.articles[t].description)

    artigos.manchetes.texto.push(dados.articles[t].content)

    artigos.manchetes.data.push(dados.articles[t].publishedAt)

  } 

  exibirFrontEnd()
  console.log(artigos)

}

/* export function limparSearch(){ // limpar objeto

  for(var a in artigos.manchetes.autor){

    if(artigos.manchetes.autor[a] == null){

      teste('hellooo')

    } else{

      teste('byeee')

    }

  }

} */


export var articleSub = document.getElementById('articleSubcontainer')

function exibirFrontEnd(){  

  for(let y = 0 ; y <= quantidArtigos ; y++){

    // criando a tag container do card de noticias
    var aside = document.createElement('aside')
    aside.setAttribute('class', 'news-card')

    articleSub.appendChild(aside)

    // criando link
    var link =  document.createElement('a')
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.href = artigos.manchetes.url[y]

    // criando titulo
    var tittleNews = document.createElement('h2')
    tittleNews.setAttribute('id', 'tittleNews')
    tittleNews.textContent = artigos.manchetes.titulo[y]

    link.appendChild(tittleNews)

    //criando descrição
    var pDescription = document.createElement('p')
    pDescription.setAttribute('id', 'description')
    pDescription.textContent = artigos.manchetes.descricao[y]

    // criando information
    var iconI = document.createElement('i')
    iconI.innerText = 'i'
    iconI.setAttribute('id', 'information')

    // criando texto para cada info
    var span = document.createElement('span')
    span.setAttribute('id', 'mensage')
    span.innerHTML = ' Os links das noticias são de fontes seguras e seus dados de navegação estão protegidos.'


    // colocando todas as tag como filhas do aisde subcontainer
    aside.appendChild(link)
    aside.appendChild(pDescription)
    aside.appendChild(iconI)
    aside.appendChild(span)
 
  }

}

///limparArtigos(aside)
// mostrando ao usuário o seu critério de busca e a sua pesquisa inserida no input
export function checkPesquisa(){

  adequedFrontEnd(inputsChecks[0], inputsChecks[1])
  mostrarTitle()

}


export function mostrarTitle(){

  /*   if(tittleContainer.hasChildNodes() == true){ */

  /* tittleContainer.forEach(function(container) {
    container.clear()
  }) */


  var h1 = document.createElement('h1')
  h1.setAttribute('id', 'userSearch') 
  h1.innerHTML = `Resultados com `
  
  var search = document.createElement('span')
  search.setAttribute('id', 'search')
  search.innerHTML = ` ${pesquisaUser}`
  h1.appendChild(search)

  var p = document.createElement('p')
  p.setAttribute('id', 'userChoice')
  p.innerHTML = `Exibindo resultados com base em <br>`

  var markSearch = document.createElement('mark') // depois criar o mark dois e dps anexalo ao p, para ver se ee aceita
  markSearch.setAttribute('id', 'searchChoice')
  markSearch.innerHTML = `${busca}`

  var markResult = document.createElement('mark')
  markResult.setAttribute('id', 'resultChoice')
  markResult.innerHTML = `${resultado}`

  p.appendChild(markSearch)
  p.innerHTML += ' e '
  p.appendChild(markResult)

  tittleContainer.appendChild(h1)
  tittleContainer.appendChild(p)
  

}


// adequando o back para front

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

export function limparArtigos(){

  var containers = document.querySelectorAll('.container')


    containers.forEach( function(container) {
      container.remove()
    })


    return console.log('limpando') 
  
  
}

