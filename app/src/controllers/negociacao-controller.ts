import { domInjector } from "../decorators/dom-injector.js"
import { inspect } from "../decorators/inspect.js"
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js"
import { DiasDaSemana } from "../enums/dias-da-semana.js"
import { Negociacao } from "../models/negociacao.js"
import { Negociacoes } from "../models/negociacoes.js"
import { NegociacoesService } from "../services/negociacoes-service.js"
import { imprimir } from "../utils/imprimir.js"
import { MensagemView } from "../views/mensagem-view.js"
import { NegociacoesView } from "../views/negociacoes-views.js"

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement
    @domInjector('#quantidade')
    private inputQuant: HTMLInputElement
    @domInjector('#valor')
    private inputValor: HTMLInputElement
    private negociacoes = new Negociacoes()
    private negociacoesView = new NegociacoesView('#negociacoesView')
    private mensagemView = new MensagemView('#mensagemView')
    private negociacoesService = new NegociacoesService()

    constructor() {
        // this.inputData = document.querySelector('#data') as HTMLInputElement // Ao atribuir 'HTMLInputElement estou fazendo um casting explícito. Estou assumindo que o querySelector sempre retornará um elemento HTML.
        // //Isso foi necessário pois adicionei no TSConfig que vou trabalhar com checagem de nulos (strictNullChecks)' 
        // this.inputQuant = <HTMLInputElement>document.querySelector('#quantidade') // Aqui é outra forma de casting. Independente do resultado, estou falando para o compilador que o retorno é um HTML element
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement
        this.negociacoesView.update(this.negociacoes)
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void { // Uma boa prática é sempre tipar o retorno do método, para as coisas ficarem mais claras

        // Aqui é o início do teste de performance
        // const t1 = performance.now()

        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuant.value,
            this.inputValor.value)

        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas!')
            return
        }
        this.negociacoes.adiciona(negociacao)
        imprimir(negociacao, this.negociacoes) // aqui estou chamando apenas propriedades que extendem a classe abstrata "Imprimivel"
        this.limparFormulario()
        this.atualizaView()

        // Aqui temos um teste de performance de execução
        // const t2 = performance.now();
        // console.log(`Tempo de execução do método adiciona(): ${(t2 - t1)/1000} segundos.`)
    }

    public importarDados(): void {
        this.negociacoesService.obterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            return negociacoesDeHoje.filter(negociacoesDeHoje => {
                return !this.negociacoes.lista()
                .some(negociacao => negociacao.ehIgual(negociacoesDeHoje))
            })
        })
        .then(negociacoesDeHoje => {
            for(let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao)
            }
            this.negociacoesView.update(this.negociacoes)
        })
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
    }

    private limparFormulario(): void {
        this.inputData.value = ''
        this.inputQuant.value = ''
        this.inputValor.value = ''
        this.inputData.focus()
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!')
    }
}