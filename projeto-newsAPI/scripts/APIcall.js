import { articleSub, checkPesquisa, errorMensage, exbirErroStatus, exibirFrontEnd, mostrarTitle, noServerConneting, tittleContainer, tooManyCalls } from "./frontEnd.js"
import { artigos, limparArtigos, limparObjectArtigos, limparTittle, test } from "./backEnd.js"
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

export function definirUrls(search, result) { // função para adequar as url de acordo com a chamada do usuário

    if (search == 'Palavra-Chave') {

        adequedUrlKeyWord(pesquisaUser, result)

    } else if (search == 'Domínio') {

        adequarUrlDomain(pesquisaUser, result)

    }


    fetch(url, {

        headers: {
            'X-API-Key': apiKey
        },
    
    })
    .then(response => {       
    
        if(!response.ok){ // caso o servidor resonder com erro

            sucessResult = false
            throw new Error(response.status)

        }

        sucessResult = true
        return  response.json()
    
        }) 
        .then(data => {

            if(data.totalResults == 0){ // se não tiver resultados

                exbirErroStatus()
                throw new Error('Erro: sem resultados para essa pesquisa')

            } else{

                sucessResult = true
                consumirDados(data) //manda os dados para fatorá-los
                console.log(data)
    
                callsSussced += 1 //retorna para as verificações que ja foram feitas chamadas de api

            }

        })
    
        .catch(error =>  { // chamada de erros   
            
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

                console.error('Erro: ', error.status)

            }

        })

}

function adequedUrlKeyWord(userSearch, result) { // adequa as urls de acordo com o criterio de palavra-chave

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

function adequarUrlDomain(userSearch, result) { // adequa as urls de chamada de acordo com o critério de dominio

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
export let callsSussced = 0 // verificação para saber quntas pesquisas ja foram feitas
export let quantidArtigos = 0 // verificando a quantidade de arquivos presentes

async function consumirDados(dados) {

    quantidArtigos = await dados.totalResults >= 5 ? 5 : dados.totalResults
        
    limparObjectArtigos() // limpa o object de refatoração
    limparArtigos() // limpa os os artigos presentels


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
    exibirFrontEnd() // exibe os dados presentes no objeto artigos

}
