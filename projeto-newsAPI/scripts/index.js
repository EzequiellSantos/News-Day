import { checkPesquisa, errorMensage, exbirErroStatus } from "./frontEnd.js"
import { artigos, busca, checklogSearchs, coletingChoices, firstVisitUser, limparArtigos, limparChildren, resultado, test, updateLocalStorage } from "./backEnd.js"
import { callsSussced, definirUrls, sucessResult} from "./APIcall.js"

firstVisitUser()

export var pesquisaUser = ''
export var valorInput = ''
var iconBusca = document.getElementById('iconBusca')
iconBusca.addEventListener('click', clicouProcurar)

// quando o usuário clicar na lupa
export function clicouProcurar(){

    valorInput = input.value
    pesquisaUser = valorInput


    checklogSearchs()

    if(valorInput == ''){

        limparArtigos()
        exbirErroStatus()
        console.log('error 1')

    }else if(sucessResult == false){

        limparArtigos()
        exbirErroStatus()
        console.log('erro 2')


    } else if(callsSussced == 0 && errorMensage == true){ // Tudo Ok

        console.log('fantasminha presente')
        limparArtigos()
        coletingChoices() // coleta os parâmetros de pesquisa do usuário
        checkPesquisa() // fornece ao usuário os parâmetros de pesquisas
        definirUrls( busca, resultado)
        updateLocalStorage() // so caso o usuário aceitar

        

    } else if(callsSussced == 0){
        // limpar os antigos artigos 

        console.clear()
        console.log('chamada feita com sucesso')
        coletingChoices() // coleta os parâmetros de pesquisa do usuário
        checkPesquisa() // fornece ao usuário os parâmetros de pesquisas
        definirUrls(busca, resultado)
        updateLocalStorage() // so caso o usuário aceitar


    } else if(callsSussced > 0){
        console.log('segunda chamada né vabagundo')
        limparArtigos()

        coletingChoices() // coleta os parâmetros de pesquisa do usuário
        checkPesquisa() // fornece ao usuário os parâmetros de pesquisas
        definirUrls( busca, resultado)
        updateLocalStorage() // so caso o usuário aceitar

    }


    limparUserSearch()
    input.value = ''




}

export function limparUserSearch(){
    pesquisaUser = ''
    valorInput = ''
}

/* document.getElementById('menuSide').addEventListener('click', function(event){

    if(event.target.matches('li')){

        let itemUlClass = event.target.class
        let itemUlId = event.target.id

        console.log(itemUlId, itemUlClass)

    }   


}) */
