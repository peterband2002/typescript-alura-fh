import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
    private negociacoes: Negociacao[] = []; // A forma "Negociacao[]" é um encurtamento de "Array<Negociacao>"

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    public lista(): readonly Negociacao[] { // O método 'ReadonlyArray', somente permite visualização dos dados, prevenindo alterações
        // A segunda forma "readonly Negociacao[]" é uma forma encurtada de "ReadonlyArray<Negociacao>"
        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2)
    }

    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista())
    }
}