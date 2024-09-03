import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao>{

    constructor(private _data: Date, public readonly quant: number, public readonly valor: number) { // Essa forma é um encurtamento de atribuições, ao declarar o tipo da variável ao passar os parâmetros do construtor,
    //o TS por baixo dos penos está realizando a atribuição "this." destes atributos. Para conferir basta ir no código gerado em JS

    //super() // aqui estou garantindo a chamada do construtor pai, da "super" classe

    }

    public static criaDe(dataString: string, quantString: string, valorString: string): Negociacao { // Ao definir esse método como estático, eu posso chamá-lo direto da classe
        const exp = /-/g; // Aqui estou criando uma expressão regular para localizar hífens, porém em todo o escopo (g = global)
        const date = new Date(dataString.replace(exp, ',')) // Aqui estou atribuindo o formato da data, utilizando o replace para substituir os hifens localizados na variável 'exp'
        const quant = parseInt(quantString)
        const valor = parseFloat(valorString)
        return new Negociacao(date, quant, valor)
    }

    get volume(): number {
        return this.quant * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime()); // Aqui é uma programação defensida. Estou clonando minha data, para que caso alguém "sete" minha data, o comando seja aplicado apenas em uma cópia da data.
        return data;
    }

    public paraTexto(): string { // como estou extendendo de uma classe abstrata, aqui estou implementando o método abstrato
        return `
            Data ${this.data},
            Quantidade ${this.quant},
            Valor: ${this.valor}    
        `
    }

    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
        && this.data.getMonth() === negociacao.data.getMonth()
        && this.data.getFullYear() === negociacao.data.getFullYear()
    }
}