import { verificarTema , trocarTema} from"../../helpers/tema-helper.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")

let Pergunta = 1
let quiz = {}
let pontos =

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

verificarTema(body, botaoTema)

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone")
    const iconeImg = document.querySelector(".assunto_icone img")
    const assuntoTitulo = document.querySelector(".assunto h1")

    divIcone.classList.add(assunto.toLowerCase())
    iconeImg.setAttribute("src", `../../assets/images/icon-${assunto.toLowerCase()}.svg`)
    iconeImg.setAttribute("alt", `ícone de ${assunto}`)
    assuntoTitulo.innerText = assunto
}

alterarAssunto()

async function buscarPerguntas() {
    const urlDados = "../../data.json"
    
    await fetch(urlDados).then(resposta => resposta.json()).then(dados =>{
        dados.quizzes.forEach(dado =>{
             if  ( dado.title  ===  assunto )  {
                quiz  =  dado
             }
        })
    })
}

buscarPerguntas()

function montarPergunta() {
    const main = document.querySelector("main")

    main.innerHTML = `
    <section class="pergunta">
    <div>
        <p>Questão ${ pergunta } de 10</p>
        <h2> ${ alterarSinais ( quiz . perguntas [ pergunta - 1 ] . pergunta ) } </h2>
    </div>
    <div class="barra_progresso">
        <div style="width: ${ pergunta  *  10 } %"></div>
    </div>
</seção>
<seção class="alternativas">
    <form action="">
        <label for="alternativa_a">
            <input type="radio" id="alternativa_a" name="alternativa">
            <div>
                <span>A</span>
                ${ alterarSinais ( quiz . perguntas [ pergunta - 1 ] . opções [ 0 ] ) }
            </div>
        </label>
        <label for="alternativa_b">
            <input type="radio" id="alternativa_b" name="alternativa">
            <div>
                <span>B</span>
                ${ alterarSinais ( quiz . perguntas [ pergunta - 1 ] . opções [ 1 ] ) }
            </div>
        </label>
        <label for="alternativa_c">
            <input type="radio" id="alternativa_c" name="alternativa">
            <div>
                <span>C</span>
                ${ alterarSinais ( quiz . perguntas [ pergunta - 1 ] . opções [ 2 ] ) }
            </div>
        </label>
        <label for="alternativa_d">
            <input type="radio" id="alternativa_d" name="alternativa">
            <div>
                <span>D</span>
                ${ alterarSinais ( quiz . perguntas [ pergunta - 1 ] . opções [ 3 ] ) }
            </div>
        </label>
    </form>
    <button>Enviar</button>
</seção>
`
}

function alterarSinais(texto) {
    return texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

função  assíncrona iniciar ( )  {
alterarAssunto ( )
aguarde  buscarPerguntas ( )
montarPergunta ( )
}

iniciar ( )