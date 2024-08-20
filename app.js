//let titulo = document.querySelector(`h1`);
//titulo.innerHTML = `Jogo do número secreto`;

//let paragrafo = document.querySelector(`p`)
//paragrafo.innerHTML = `Escolha um numero entre 1 e 10`;
let listaDeNumerosSorteados = [];
let limiteNumeroSorteado = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let paragrafo = document.querySelector(tag)
    paragrafo.innerHTML = texto;
    responsiveVoice.speak(texto, `Brazilian Portuguese Female`,{rate:1.2});
}
function exibirMensagemInical() {
    exibirTextoNaTela(`h1`, `Jogo do número secreto`);
    exibirTextoNaTela(`p`, `Escolha um numero entre 1 e 10`);
}
exibirMensagemInical();

function verificarChute(){
    let chute = document.querySelector(`input`).value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela(`h1`,`ACERTOU!`);
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;
        let mensagemTentativa = `Você descobriu o numero secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela(`p`, mensagemTentativa);
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela(`p`,`O numero secreto é menor`);
        } else {
            exibirTextoNaTela(`p`,`O numero secreto é maior`);
        }
        tentativas++;
        limparCampo();
    }
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* limiteNumeroSorteado + 1);
    let quatidadeDeElementosDaLista = listaDeNumerosSorteados.length;

    if(quatidadeDeElementosDaLista == limiteNumeroSorteado){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}
console.log(numeroSecreto);

function limparCampo(){
    chute = document.querySelector(`input`);
    chute.value = ``;
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1
    exibirMensagemInical();
    document.getElementById(`reiniciar`).setAttribute(`disabled`, true)
}