import { limparUserSearch, pesquisaUser } from "./index.js"
import {} from "./APIcall.js"
import { antigoSearch, articleSub, exibirCartaoEntrada, tittleContainer, updatePlaceHolder } from "./frontEnd.js"

// sript da junção dos dados da api e preparação das informações para exibir na api


export let artigos = {

    manchetes: {
  
      url: ['jd9ehd'],
      urlImage: ['ndevheh'],
      font: [],
      data: [],
      autor: [],
      titulo: [],
      descricao: [],
      texto: [ 'dhchwudhcwbdc']
  
    }
  
  
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

  
  updatePlaceHolder(busca)

}

// coletar os critérios de busca do usuário
export var inputsChecks = []
export function coletingChoices(){

    inputsChecks = []
    const inputsRadio = document.querySelectorAll('.box')

    inputsRadio.forEach(input => {

        if(input.checked){

            inputsChecks.push(input.id)
            
        }

    })

    adequedFrontEnd(inputsChecks[0], inputsChecks[1])
    updatePlaceHolder(busca)
    

}

// armazenando os dados de pesquisas do usuário
export function updateLocalStorage(){

    localStorage.setItem('lastSearch', pesquisaUser)
    localStorage.setItem('LastChoiceSearch', inputsChecks[0])
    localStorage.setItem('LastChoiceResult', inputsChecks[1])

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
    exibirCartaoEntrada()
    console.log('Você não tem pesquisas recentes guardadas')
    cleanLocalStorage()
  }

}

// limpar o local storage
export function cleanLocalStorage(){

    localStorage.removeItem('lastSearch')
    localStorage.removeItem('LastChoiceSearch')
    localStorage.removeItem('LastChoiceResult')


}


//limpar os artigos e titulos
export function limparArtigos(){

    for(let tai in artigos.manchetes){ // limpando os artigos armazenados da ultima pesquisa
        
        if(artigos.manchetes[tai].length != 0){

            artigos.manchetes[tai] = []

        }

    }

    var containers = document.querySelectorAll('.container')

    if(articleSub.hasChildNodes() || tittleContainer.hasChildNodes()){

        containers.forEach( function(container) {

            var filhos = container.childNodes
    
            filhos.forEach(function(filho){
                filho.remove()
            })

            limparChildren()
    
    
        })


        
    } else{

        console.log('parece que nao tem filhos')

    }




    return console.log('limpando')  

  
}

export function limparChildren(){
    var childrens = document.querySelectorAll('.chidren')

    childrens.forEach(function(children){
        children.remove()
    })
}

export function checklogSearchs(){
    if(antigoSearch != pesquisaUser){
        limparArtigos()
        limparChildren()

        return pesquisaUser

    }else{
        return
    }
}

// testes
export function test(item0, item1){
    console.log(' - >Teste ', item0, item1)
    console.log(' - >Typeof ', typeof(item0), typeof(item1))
}