import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) { // Esse condicional foi adicionado depois de habilitado o strictnullchecks, para validar se o form existe ou não
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error('Não possível inicializar a aplicação. Verifique se o form existe.')
}

const botaoImporta = document.querySelector('#botao-importa')
if(botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        controller.importarDados()
    })
} else {
    throw Error('Botão importa não foi encontrado!')
}