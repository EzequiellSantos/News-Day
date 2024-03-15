import { LastChoiceResult, LastChoiceSearch, adequedFrontEnd, checkPesquisa, definirUrls, firstVisitUser, busca, resultado, updatePlaceHolder } from "./usserCases.js";

/* input, result, search */

firstVisitUser()


//controle input

export let pesquisaUser = ''
var iconBusca = document.getElementById('iconBusca')
export var inputElement = document.getElementById('input')
iconBusca.addEventListener('click', clicouProcurar)

// quando o usuário clicar a teca enter no input
inputElement.addEventListener('keydown', function (event) {

    if(event.keyCode === 13){
        clicouProcurar()
    }

})

// quando o usuário clicar na lupa
function clicouProcurar(){

    var valorInput = input.value

    if(valorInput == ''){

        console.error('Ja era')

        return

    } else{

        pesquisaUser = valorInput
        coletingChoices() // coleta os parâmetros de pesquisa do usuário
        checkPesquisa() // fornece ao usuário os parâmetros de pesquisas
        definirUrls(pesquisaUser, busca, resultado)
        updateLocalStorage() // so caso o usuário aceitar

    }


}

// armazenando os dados de pesquisas do usuário
function updateLocalStorage(){

    localStorage.setItem('lastSearch', pesquisaUser)
    localStorage.setItem('LastChoiceSearch', inputsChecks[0])
    localStorage.setItem('LastChoiceResult', inputsChecks[1])

}

// limpar o local storage
export function cleanLocalStorage(){

    localStorage.removeItem('lastSearch')
    localStorage.removeItem('LastChoiceSearch')
    localStorage.removeItem('LastChoiceResult')


}

// coletar os critérios de busca do usuário
export let inputsChecks = []
function coletingChoices(){

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



/* document.getElementById('menuSide').addEventListener('click', function(event){

    if(event.target.matches('li')){

        let itemUlClass = event.target.class
        let itemUlId = event.target.id

        console.log(itemUlId, itemUlClass)

    }   


}) */

// controle do menu
var iconHambug = document.getElementById('iconHamburguer')
var iconX = document.getElementById('iconX')
var menuSide = document.getElementById('menuSide')


iconX.addEventListener('click', ocultar)
iconHambug.addEventListener('click', clicou)

function clicou() {

    menuSide.classList.remove('desaparecer')
    menuSide.classList.add('surgir')
    menuSide.classList.remove('init')

    iconHambug.style.opacity = '0'
    iconX.classList.add('iconX-surgir')
    iconX.classList.remove('init')


}

function ocultar(){

    menuSide.classList.add('desaparecer')
    
    setTimeout(function(){
        menuSide.classList.add('init')

    },300)

    iconX.classList.add('init')
    iconHambug.style.opacity = '1'
    iconX.classList.remove('iconX-surgir')
    menuSide.classList.remove('surgir')

}


var ulForSearch = document.querySelector('#forSearch')
var ulForResult = document.querySelector('#forResult')
var ulForCredits = document.querySelector('#credits')

/* 

document.getElementById('menuSide').addEventListener('click', function(event){

    if(event.target.matches('li')){

        var itemUl = event.target.id
        teste(itemUl)

    }   

})

*/
ulForCredits.addEventListener('click', function(){

    menuControl(ulForCredits)

})

ulForResult.addEventListener('click', function(){

    menuControl(ulForResult)

})
ulForSearch.addEventListener('click', function(){

    menuControl(ulForSearch)

})

let ul = ''
function menuControl(list){

    ul = list

    if(ul.classList.contains('exibirSub')){

        ul.classList.remove('exibirSub')


    } else{

        ul.classList.add('exibirSub')

    }

}

export function teste(item0, item1){
    console.log(' - >Teste ', item0, item1)
    console.log(' - >Typeof ', typeof(item0), typeof(item1))
}