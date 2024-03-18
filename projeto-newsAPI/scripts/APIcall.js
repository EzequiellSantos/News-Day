import { exbirErroStatus, exibirFrontEnd, tooManyCalls } from "./frontEnd.js"
import { artigos, limparArtigos } from "./backEnd.js"
import { limparUserSearch, pesquisaUser } from "./index.js"

//script de todo o código de consumo da API (trasnformações de url, seleção dos dados e status da chamadas)

var date = new Date()
var day = date.getDate()
var mes = date.getMonth()
var ano = date.getFullYear()
var mesAtual = mes + 1
let dateToday = `${ano}-${mesAtual.toString().padStart(2, '0')}-${day - 1}`

const keyAPI = '8164a1687d9e4d80a5901e71edaf039c'

// chamadas de  api

var url = ''

export function definirUrls(search, result) {

    if (search == 'Palavra-Chave') {

        adequedUrlKeyWord(pesquisaUser, result)

    } else if (search == 'Domínio') {

        adequarUrlDomain(pesquisaUser, result)

    }


    limparUserSearch()
    chamarAPI(url)

}

function adequedUrlKeyWord(userSearch, result) {

    if (result == 'Data') {

        url = `https://newsapi.org/v2/everything?q=${userSearch}&from=${dateToday}&to=${dateToday}&sortBy=publishedAt&apiKey=${keyAPI}`

    } else if (result == 'Popularidade') {

        url = `https://newsapi.org/v2/everything?q=${userSearch}&sortBy=popularity&apiKey=${keyAPI}`

    } else if (result == 'Relevância') {

        url = `https://newsapi.org/v2/everything?q=${userSearch}&sortBy=relevancy&apiKey=${keyAPI}`

    } else if (result == 'Última-Hora') {

        url = `https://newsapi.org/v2/top-headlines?q=${userSearch}&apiKey=${keyAPI}`

    }

    console.log(userSearch)

}

function adequarUrlDomain(userSearch, result) {

    if (result == "Data") {

        url = `https://newsapi.org/v2/everything?domains=${userSearch}&from=${dateToday}&to=${dateToday}&sortBy=publishedAt&apiKey=${keyAPI}`

    } else if (result == 'Popularidade') {

        url = `https://newsapi.org/v2/everything?domains=${userSearch}&sortBy=popularity&apiKey=${keyAPI}`

    } else if (result == 'Relevância') {

        url = `https://newsapi.org/v2/everything?domains=${userSearch}&sortBy=relevancy&apiKey=${keyAPI}`

    } else if (result == 'Última-Hora') {

        url = `https://newsapi.org/v2/top-headlines?domains=${userSearch}&apiKey=${keyAPI}`

    }

    console.log(userSearch)

}

export let sucessResult = null
export let callsSussced = 0

export async function chamarAPI(apiURL) {

    try {

        var response = await fetch(apiURL)

        if (response.ok) {

            var dados = await response.json()
            consumirDados(dados)
            console.log(dados)
            console.log(pesquisaUser)

            sucessResult = true
            callsSussced += 1

        } else {

            sucessResult = false
            

            if (response.status == 400) {

                console.error('Não encontrado esse tipo de pesquisa')
                exbirErroStatus()

            } else if (response.status == 429) {

                tooManyCalls()
                console.error('Você Fez Muitas solicitações')

            } else if (response.status == 500) {

                console.error('Nosso Provedor de Noticias Está com problemas')

            } else {

                console.log(response.status)

            }

        }


    } catch (error) {

        console.log('Erro: ', error.message)
        

    }

}

export let quantidArtigos = 0

async function consumirDados(dados) {

    quantidArtigos = await dados.articles.length >= 1 ? 1 : dados.articles.length

    if(quantidArtigos == 0){
        limparArtigos()
        exbirErroStatus()
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

        exibirFrontEnd()

    }


}