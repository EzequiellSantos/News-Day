import { limparUserSearch, pesquisaUser } from "./index.js"
import {} from "./APIcall.js"
import { antigoSearch, articleSub, exibirCartaoEntrada, p, tittleContainer, updatePlaceHolder } from "./frontEnd.js"

// sript da junção dos dados da api e preparação das informações para exibir na api


export let artigos = {
   
  // object para refatoração e evitar um código muito extenso

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

// adequando o back para front

export let busca = '' // variavel de adaptação
export let resultado = '' // variavel de adaptação

export function adequedFrontEnd(search, results) { // adaptando os parametros de busca para o front

  switch (search) { // adequação da variavel busca
    case 'checkPalavraChave':
      busca = 'Palavra-Chave'
      break

    case 'checkDominio':
      busca = 'Domínio'
      break
  }

  switch (results) { // adequação da variavel resultados
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


  updatePlaceHolder(busca) // chama a função de atualizar o placeholder de acordo com o parametro de pesquisa

}


/* coletar os critérios de busca do usuário */

export var inputsChecks = [] // array que armazena os inputs ativados pelo user

export function coletingChoices() { // função para coletar os inputs ativados

  inputsChecks = [] // limpa antes de coletar
  const inputsRadio = document.querySelectorAll('.box')

  inputsRadio.forEach(input => { // percorre em cada input do tipo radio com a classe box

    if (input.checked) {

      inputsChecks.push(input.id) // devolve o id do input  ativado

    }

  })

  adequedFrontEnd(inputsChecks[0], inputsChecks[1])
  updatePlaceHolder(busca)


}

// armazenando os dados de pesquisas do usuário
export function updateLocalStorage() {

  localStorage.setItem('lastSearch', pesquisaUser)
  localStorage.setItem('LastChoiceSearch', inputsChecks[0])
  localStorage.setItem('LastChoiceResult', inputsChecks[1])

}


export let lastSearch = localStorage.getItem('lastSearch')
export let LastChoiceSearch = localStorage.getItem('LastChoiceSearch')
export let LastChoiceResult = localStorage.getItem('LastChoiceResult')
export let permissionUser = false // variavel que armazena a escolha do usuário

export function firstVisitUser() {// verificando se é a primeira visita do usuário na página

  if (permissionUser) {

    //adicionar verificação para chamar a api 

    /* ativar os inputs presentes no Busca e Resultado, e fazer uma chamada a API */
    console.log('localStorage => ', lastSearch, busca, resultado)
    adequedFrontEnd(LastChoiceSearch, LastChoiceResult)

  } else {
    exibirCartaoEntrada() // chama a função de resultados para primeira visita
    console.log('Você não tem pesquisas recentes guardadas')
    cleanLocalStorage() //limpando localStorage
  }

}

// limpar o local storage
export function cleanLocalStorage() {

  localStorage.removeItem('lastSearch')
  localStorage.removeItem('LastChoiceSearch')
  localStorage.removeItem('LastChoiceResult')


}

export function limparObjectArtigos(){

  for (let tai in artigos.manchetes) { // limpando os artigos armazenados da ultima pesquisa

    if (artigos.manchetes[tai].length != 0) { //loop que percorre cada item dentro do objeto manchetes

      artigos.manchetes[tai] = [] // limpa todas as arrays presentes dentro do objeto

    }

  }
}

//limpar os artigos
export function limparArtigos() {

  var containers = document.querySelectorAll('.article-container')

  while(articleSub.hasChildNodes()) { //verificação se o container de noticias tem noticas dentro

    containers.forEach(function (container) { //percorre cada item dentro do container

      var filhos = container.childNodes

      filhos.forEach(function (filho) { //remove cada filho presente
        filho.remove()
      })

    })

  }

}

//limpando o título
export function limparTittle() {

  var title = document.querySelectorAll('.tittle-container')


  while(tittleContainer.hasChildNodes()){

    title.forEach(function(container){ // percorre cada elemento dentro do container

      var filhos = container.childNodes

      filhos.forEach(function(filho){ // remove cada filho presente
        filho.remove()
      })

    })

    p.remove() // remove um p que causa conflito no tittle

  }

}


export function checklogSearchs() { // função para verificar se a ultima pesquisa é igual a nova

  if (antigoSearch != pesquisaUser) {

    limparArtigos() // limpa os artigos presentes
    limparTittle()// limpa o titulo presente

    return pesquisaUser

  }


}

// testes
export function test(item0, item1) {
  console.log(' - >Teste ', item0, item1)
  console.log(' - >Typeof ', typeof (item0), typeof (item1))
}