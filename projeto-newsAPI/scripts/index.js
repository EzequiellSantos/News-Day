import { chamarApi } from "./usserCases.js";

chamarApi()
/* input, result, search */




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

menuSide.addEventListener('click', function(event){
    const clicouDentro = menuSide.contains(event.target)

    if(!clicouDentro){
        ocultar()
    }

})



var ulForSearch = document.getElementById('forSearch')
var ulForResult = document.getElementById('forResult')
var ulForCredits = document.getElementById('credits')

ulForCredits.addEventListener('click', mostrarCredits)
ulForResult.addEventListener('click', mostrarResults)
ulForSearch.addEventListener('click', mostrarSearch)


function mostrarResults(){
    displaySubtItensResult()
    changeUl()
}

function mostrarSearch(){
    displaySubItensSearch()
    changeUl()
}

function mostrarCredits(){
    displaySubItensCredits()
    changeUl()
}

function displaySubtItensResult(){

    ulForResult.classList.add('exibirSub')

}

function displaySubItensSearch(){

    ulForSearch.classList.add('exibirSub')

}

function displaySubItensCredits(){

    ulForCredits.classList.add('exibirSub')

}

let ul = ulForCredits

function changeUl(){

    if(ulForCredits.classList.contains('exibirSub')){

        ul = ulForCredits

    } else if(ulForResult.classList.contains('exibirSub')){

        ul = ulForResult

    } else if(ulForSearch.classList.contains('exibirSub')){

        ul = ulForSearch

    } 
}

changeUl()


document.addEventListener('click', function(evento){
    const clicadoDentroDoElemento = ul.contains(evento.target)

    if(!clicadoDentroDoElemento){
        ul.classList.remove('exibirSub')
    }

    changeUl()

})