let chaveIA = "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"

async function clickButton() {
    let localSearch = document.querySelector(".input-local").value
    let middleContainer = document.querySelector(".middle-container")
    let chave = "7840020f2666589b0b454b4188825d45"
    

    let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${localSearch}&appid=${chave}&units=metric&lang=pt_br`
    //Preciso avisar o JS que vou até o servidor
    //Traduzir a resposta do servidor / JSON

    let respostaServer = await fetch(endereco)
    let dadosJson = await respostaServer.json()
    console.log(dadosJson)

    middleContainer.innerHTML = `
    <h2 class="local">${dadosJson.name}</h2>
    <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
    <img src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png" class="icone">
    <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>

    <button class="botao-ia" onclick="sugestionCloset()">Sugestão de roupa</button>
    <P class="resposta-ia"></P>
    `
}

function detectaVoz() {
    let reconhecimento = new window.webkitSpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.start()

    reconhecimento.onresult = function (event) {
        let transcription = event.results[0][0].transcript
        document.querySelector(".input-local").value = transcription

        clickButton()
    }


}


async function sugestionCloset() {
    let temperatura = document.querySelector(".temp").textContent
    let umidade = document.querySelector(".umidade").textContent
    let localCidade = document.querySelector(".local").textContent


    let respostaIa = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + chaveIA
        },
        body: JSON.stringify({
            model: "meta-llama/llama-4-maverick-17b-128e-instruct",
            messages: [
                {
                    "role": "user",
                    "content": "Me explique tudo sobre JavaScript"
                }
            ]
        })
    })


    let dadosRespostaIA = await respostaIa.json()
    console.log(dadosRespostaIA)
}




/*
        FLUXO BÁSICO
[x] 1- Descobrir quando o botão foi clicado
[x] 2- Pegar o nome da cidade no input
[x] 3- Enviar a cidade para o servidor
[ ] 4- Pegar a resposta e colocar na tela

        FLUXO DE VOZ
[ ] 5- Descobrir quando o botão foi clicado
[ ] 6- Comçarr a ouvir e pegar a transcição
[ ] 7- Enviar a transcrição para o servidor
[ ] 8- Pegar a resposta e colocar na tela

        FLUXO DA IA
[ ] 9- Pegar os dados da cidade
[ ] 10- Enviar os dados para IA
[ ] 11- Trazer e colocar os dados na tela

apikey da ia ="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"

*/