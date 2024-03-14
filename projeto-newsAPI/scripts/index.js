import { LastChoiceResult, LastChoiceSearch, adequedFrontEnd, chamarApi, checkPesquisa, firstVisitUser } from "./usserCases.js";

/* input, result, search */

adequedFrontEnd(LastChoiceSearch, LastChoiceResult)
firstVisitUser()


//controle input

export let pesquisaUser = ''
var iconBusca = document.getElementById('iconBusca')
var input = document.getElementById('input')
iconBusca.addEventListener('click', clicouProcurar)

input.addEventListener('keydown', function (event) {

    if(event.keyCode === 13){
        clicouProcurar()
    }

})

function clicouProcurar(){

    var valorInput = input.value
    pesquisaUser = valorInput

    coletingChoices()
    checkPesquisa()
    updateLocalStorage()

}

// armazenando os dados de pesquisas do usuário
function updateLocalStorage(){

    localStorage.setItem('lastSearch', pesquisaUser)
    localStorage.setItem('LastChoiceSearch', inputsChecks[0])
    localStorage.setItem('LastChoiceResult', inputsChecks[1])

}

function cleanLocalStorage(){

    localStorage.removeItem('lastSearch')
    localStorage.removeItem('LastChoiceSearch')
    localStorage.removeItem('LastChoiceResult')


}

export let inputsChecks = []

function coletingChoices(){

    inputsChecks = []
    const inputsRadio = document.querySelectorAll('.box')

    inputsRadio.forEach(input => {

        if(input.checked){

            inputsChecks.push(input.id)
            
        }

    })
    

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
    console.log(' - >Teste', item0, item1)
}