import { errorMensage, exbirErroStatus, exibirFrontEnd, noServerConneting, tooManyCalls } from "./frontEnd.js"
import { artigos, limparArtigos, test } from "./backEnd.js"
import { limparUserSearch, pesquisaUser } from "./index.js"

//script de todo o código de consumo da API (trasnformações de url, seleção dos dados e status da chamadas)

var date = new Date()
var day = date.getDate()
var mes = date.getMonth()
var ano = date.getFullYear()
var mesAtual = mes + 1
let dateToday = `${ano}-${mesAtual.toString().padStart(2, '0')}-${day - 1}`

const apiKey = '8164a1687d9e4d80a5901e71edaf039c'

// chamadas de  api

var url = ''

export function definirUrls(search, result) {

    if (search == 'Palavra-Chave') {

        adequedUrlKeyWord(pesquisaUser, result)

    } else if (search == 'Domínio') {

        adequarUrlDomain(pesquisaUser, result)

    }


    fetch(url, {

        method: 'GET',
        headers: {
            'X-API-Key': apiKey
        },
        credentials: 'include',
        mode: 'cors'
    
    })
    .then(response => {       
    
        if(!response.ok){

            sucessResult = false
            throw new Error(response.status)

        }

        sucessResult = true
        return  response.json()
    
        }) 
        .then(data => {

            if(data.totalResults == 0){
                exbirErroStatus()
                throw new Error('Erro: sem resultados para essa pesquisa')

            } else{

                sucessResult = true
                consumirDados(data) 
                console.log(data)
    
                callsSussced += 1

            }

        })
    
        .catch(error =>  {                
            
            sucessResult = false
            if (error.message == 400) {
        
                console.error('Não encontrado esse tipo de pesquisa')
                exbirErroStatus()

            } else if (error.message == 429) {

                tooManyCalls()
                console.error('Você Fez Muitas solicitações')

            } else if (error.message == 500) {

                noServerConneting()
                console.error('Nosso Provedor de Noticias Está com problemas')

            } else {

                console.log(error.status)
                console.error('Erro: ', error.status)

            }

        })

}

function adequedUrlKeyWord(userSearch, result) {

    if (result == 'Data') {

        url = `https://newsapi.org/v2/everything?q=${userSearch}&from=${dateToday}&to=${dateToday}&sortBy=publishedAt`

    } else if (result == 'Popularidade') {

        url = `https://newsapi.org/v2/everything?q=${userSearch}&sortBy=popularity`

    } else if (result == 'Relevância') {

        url = `https://newsapi.org/v2/everything?q=${userSearch}&sortBy=relevancy`

    } else if (result == 'Última-Hora') {

        url = `https://newsapi.org/v2/top-headlines?q=${userSearch}`

    }

    console.log(userSearch)

}

function adequarUrlDomain(userSearch, result) {

    if (result == "Data") {

        url = `https://newsapi.org/v2/everything?domains=${userSearch}&from=${dateToday}&to=${dateToday}&sortBy=publishedAt`

    } else if (result == 'Popularidade') {

        url = `https://newsapi.org/v2/everything?domains=${userSearch}&sortBy=popularity`

    } else if (result == 'Relevância') {

        url = `https://newsapi.org/v2/everything?domains=${userSearch}&sortBy=relevancy`

    } else if (result == 'Última-Hora') {

        url = `https://newsapi.org/v2/top-headlines?domains=${userSearch}`

    }

    console.log(userSearch)

}

export let sucessResult = null 
export let callsSussced = 0





export let quantidArtigos = 0

async function consumirDados(dados) {

    quantidArtigos = await dados.totalResults >= 1 ? 1 : dados.totalResults

    if(quantidArtigos == 0){

        limparArtigos()
        exbirErroStatus()
        sucessResult = false
        test(sucessResult, 'second')

    } else{

        
        for (let t = 0; t <= quantidArtigos; t++) {


            artigos.manchetes.autor.push(dados.articles[t].author)
    
            artigos.manchetes.url.push(dados.articles[t].url)
    
            artigos.manchetes.urlImage.push(dados.articles[t].urlToImage)
    
            artigos.manchetes.font.push(dados.articles[t].source.name)
    
            artigos.manchetes.titulo.push(dados.articles[t].title)
    
            artigos.manchetes.descricao.push(dados.articles[t].description)
    
            artigos.manchetes.texto.push(dados.articles[t].content)
    
            artigos.manchetes.data.push(dados.articles[t].publishedAt)
    
        }

        sucessResult = true
        exibirFrontEnd()
        test(sucessResult, 'third ')
    }


}

