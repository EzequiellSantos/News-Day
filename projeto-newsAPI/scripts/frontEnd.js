// script de toda a interação do usuário com a pagina, e exibição de informações transformadas da api para o backend da pagina

import { callsSussced, definirUrls, quantidArtigos, sucessResult } from "./APIcall.js"
import { adequedFrontEnd, artigos, busca, coletingChoices, inputsChecks, lastSearch, limparArtigos, limparTittle, limparObjectArtigos, resultado, test, updateLocalStorage, firstVisitUser, verificationForOtimization } from "./backEnd.js"
import { clicouProcurar, limparUserSearch, pesquisaUser } from "./index.js"


//controle input
export var inputElement = document.getElementById('input')
export var tittleContainer = document.getElementById('titleSearch')

// quando o usuário clicar a teca enter no input
inputElement.addEventListener('keydown', function (event) {

    if(event.keyCode == 13){
        clicouProcurar()
    }

})

// controle do menu
var iconHambug = document.getElementById('iconHamburguer')
var iconX = document.getElementById('iconX')
var menuSide = document.getElementById('menuSide')
var navMenu = document.getElementById('newsMenu')


iconX.addEventListener('click', ocultar)
iconHambug.addEventListener('click', clicou)

function clicou() { // fução de aparecer o menu

    navMenu.classList.remove('desaparecer')
    navMenu.classList.add('surgir')
    menuSide.classList.remove('init')

    iconHambug.style.opacity = '0'
    iconX.classList.add('iconX-surgir')
    iconX.classList.remove('init')


}

let automatizarSearch = '' // variável para saber se o user mudou os parâmetros com uma pesquisa ja feita

function ocultar(){ // função de ocultar menu

    navMenu.classList.add('desaparecer')
    
    setTimeout(function(){
        menuSide.classList.add('init')

    },300)

    iconX.classList.add('init')
    iconHambug.style.opacity = '1'
    iconX.classList.remove('iconX-surgir')
    navMenu.classList.remove('surgir')

    coletingChoices()

    if(callsSussced != 0){

        limparObjectArtigos()
        limparArtigos() //limap os artigos
        limparTittle() // limpa os titulos
        automatizarSearch = navMenu.classList.contains('desaparecer') ? true : false
        checkPesquisa()
        definirUrls(busca, resultado)
        
    } else{

/*         firstVisitUser() // chama a função de primeira visita */
        definirUrls()

    }


}

lastViewPort.addEventListener('click', function(){ // clicando fora do menu ativo

    ocultar() // recolher menu
    coletingChoices() // coletar escolha do usuário para pesquisa

})

var ulForSearch = document.querySelector('#forSearch')
var ulForResult = document.querySelector('#forResult')
var ulForCredits = document.querySelector('#credits')

/* 

document.getElementById('menuSide').addEventListener('click', function(event){ exibir id do item clicado

    if(event.target.matches('li')){

        var itemUl = event.target.id
        teste(itemUl)

    }   

})

*/
ulForCredits.addEventListener('click', function(){ // função para definir qual ul foi clicada

    menuControl(ulForCredits)

})

ulForResult.addEventListener('click', function(){ // função para definir qual ul foi clicada

    menuControl(ulForResult)

})

ulForSearch.addEventListener('click', function(){ // função para definir qual ul foi clicada

    menuControl(ulForSearch)

})

let ul = ''
function menuControl(list){ // pega a ul clicada e aplica ou retira as classes de exibição

    ul = list

    if(ul.classList.contains('exibirSub')){

        ul.classList.remove('exibirSub')

    } else{

        ul.classList.add('exibirSub')

    }

}

export function updatePlaceHolder(valor){

    // front-end, atualiza o place-holder com base no parametro de busca escolhido

    if(valor == 'Palavra-Chave'){
  
      input.placeholder = 'Palavra-Chave, ex: apple'
  
    } else if(valor == 'Domínio'){
  
      input.placeholder = 'Domínio, ex: bbc.com'
  
    }
  
}


export var articleSub = document.getElementById('articleSubcontainer') //container de noticias

export function exibirFrontEnd(){  // função para exibir os artigos das noticias

  for(let y = 0 ; y <= quantidArtigos ; y++){


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

    link.appendChild(pDescription)
    var sectionImg = document.createElement('section')
    sectionImg.setAttribute('id', 'img')
    sectionImg.appendChild(link)
    sectionImg.style.backgroundImage = `url('${artigos.manchetes.urlImage[y]}')`

    //criando o autor
    var pAutor = document.createElement('p')
    pAutor.innerHTML = 'Autor: '
    var spanAutor = document.createElement('span')
    spanAutor.setAttribute('id', 'autor')
    spanAutor.textContent = artigos.manchetes.autor[y]
    pAutor.appendChild(spanAutor)

    //criando o a data e fonte

    var pFont = document.createElement('p')
    pFont.innerHTML = 'Fonte: '

    var spanFont = document.createElement('span')
    spanFont.textContent = artigos.manchetes.font[y]
    pFont.appendChild(spanFont)
    pFont.innerHTML += '<br>Data: '

    var spanDate = document.createElement('span')
    spanDate.setAttribute('id', 'date')
    spanDate.innerHTML = `${artigos.manchetes.data[y]}`
    pFont.appendChild(spanDate)
    

    // criando information
    var iconI = document.createElement('i')
    iconI.innerText = 'i'
    iconI.setAttribute('id', 'information')

    // criando texto para cada info
    var span = document.createElement('span')
    span.setAttribute('id', 'mensage')
    span.innerHTML = ' Os links das noticias são de fontes seguras e seus dados de navegação estão protegidos.'


    // colocando todas as tag como filhas do aisde subcontainer
    var aside = document.createElement('aside')
    aside.setAttribute('class', 'news-card')


    aside.appendChild(sectionImg)
    aside.appendChild(pDescription)
    aside.appendChild(pAutor)
    aside.appendChild(pFont)
    aside.appendChild(iconI)
    aside.appendChild(span)
    articleSub.appendChild(aside) // criando a tag container do card de noticias
 
  }

}

// mostrando ao usuário o seu critério de busca e a sua pesquisa inserida no input
export function checkPesquisa(){

    adequedFrontEnd(inputsChecks[0], inputsChecks[1])
    mostrarTitle()
  
}

export let antigoSearch = ''

export var p = document.createElement('p')

export function mostrarTitle(){ 

    // função para exibir dados da pesquisa - pesquisa do usuário e seus parâmetros de escolha

    /*
    
    if(tittleContainer.hasChildNodes() == true){ 
  
        tittleContainer.forEach(function(container) {
        container.clear()
    })

    */

    limparTittle()

    if(input.value == '' && !automatizarSearch ){ 

        /* 
        caso o usuário mudou parametros antes de realizar pesquisa, ou
        realizou uma pesquisa sem nenhum valor
        */

        limparArtigos()
        exbirErroStatus()
        automatizarSearch = ''
        return

    } else{ // exibe os dados com de pesquisa

        var h1 = document.createElement('h1')
        h1.setAttribute('id', 'userSearch')     
        h1.setAttribute('class', 'children')
        h1.innerText = `Resultados com `
        
        var search = document.createElement('span')
        search.setAttribute('id', 'search')
        search.setAttribute('class', 'children')
        search.innerHTML = ` ${pesquisaUser}`
        antigoSearch =  search.innerHTML = ` ${pesquisaUser}`
        h1.appendChild(search)
      

        /* adequar as classes do titulo, para serem apagas quando a função de limpar tittle for chamada */

        p.setAttribute('id', 'userChoice')
        p.setAttribute('class', 'children')
        p.innerHTML = `Exibindo resultados com base em <br>`

        var markSearch = document.createElement('mark')
        markSearch.setAttribute('id', 'searchChoice')
        markSearch.innerHTML = `${busca}`
      
        var markResult = document.createElement('mark')
        markResult.setAttribute('id', 'resultChoice')
        markResult.innerHTML = `${resultado}`

        var pALt = document.createElement('span')
        pALt.textContent = ' e '

        p.appendChild(markSearch)
        p.appendChild(pALt)
        p.appendChild(markResult)



        tittleContainer.appendChild(h1)
        tittleContainer.appendChild(p)


    } 
  
}

// funções para mostrar no titulo a  mensagem de erro

export function exbirErroStatus(){  

    text = 'Ops... Não há resultados'

    createTitle(text)
    anexarImage()

}

export function tooManyCalls(){

    text = 'Error.. Você pesquisou muito ein!'
    createTitle(text)
    anexarImage()

}

export function exibirCartaoEntrada(){

    text = 'Ops.. Não há histórico de pesquisas'
    createTitle(text)
    anexarImage()

}

export function noServerConneting(){

    text = 'Sem noticias por enquanto'
    createTitle(text)
    anexarImage()

}

export function firstSearch(){
    text = 'Faça uma pesquisa primeiramente'
    createTitle(text)
    anexarImage()
}


function anexarImage(){ // função para anexar o fantasminha

    var img = document.createElement('img')
    img.setAttribute('id', 'imgResponse')
    img.src = './imagens/fantasmaNoTransparent.png'
    articleSub.appendChild(img)

}

let text = '' // variavel facilitar a mudança de texto
export let errorMensage = false // variavel de verificação de erro presente
function createTitle(text){

    //criando a resposta de erro

    limparTittle()
    errorMensage = true
    var status = document.createElement('h1')
    status.setAttribute('id', 'statusId')
    status.textContent = text
    tittleContainer.appendChild(status)
    text = ''

}

var noticationBody = document.querySelector('#notificationBody')
export var choicePermission = ''
export var permissionUser = '' // variavel que armazena a escolha do usuário

export function exibirNotificationPermission(){

    var secTextNotificxation = document.createElement('section')
    secTextNotificxation.setAttribute('id', 'TextNotification')

    var p = document.createElement('p')
    p.textContent = 'Você concorda que eu guarde suas últimas pesquisas realizadas?'

    secTextNotificxation.appendChild(p)

    var secButtons = document.createElement('section')
    secButtons.setAttribute('id', 'buttons')

    var inputCancel = document.createElement('input')
    inputCancel.setAttribute('type', 'button')
    inputCancel.setAttribute('value', 'Cancelar')
    inputCancel.setAttribute('id', 'cancelButton')

    var inputAcept = document.createElement('input')
    inputAcept.setAttribute('type', 'button')
    inputAcept.setAttribute('value', 'Aceito')
    inputAcept.setAttribute('id', 'aceptButton')


    secButtons.appendChild(inputCancel)
    secButtons.appendChild(inputAcept)
    noticationBody.appendChild(secTextNotificxation)
    noticationBody.appendChild(secButtons)
    notification.style.display = 'block'


    
    inputAcept.addEventListener('click', function(){
        choicePermission = 'true'
        permissionUser = choicePermission
        notification.style.display = 'none'
        verificationForOtimization()
        return 
    })

    inputCancel.addEventListener('click', function(){
        choicePermission = 'false'
        permissionUser = choicePermission
        notification.style.display = 'none'
        verificationForOtimization()
        return 
    })


}