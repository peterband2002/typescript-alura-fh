export class Negociacao {
    constructor(_data, quant, valor) {
        this._data = _data;
        this.quant = quant;
        this.valor = valor;
    }
    static criaDe(dataString, quantString, valorString) {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quant = parseInt(quantString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quant, valor);
    }
    get volume() {
        return this.quant * this.valor;
    }
    get data() {
        const data = new Date(this._data.getTime());
        return data;
    }
    paraTexto() {
        return `
            Data ${this.data},
            Quantidade ${this.quant},
            Valor: ${this.valor}    
        `;
    }
    ehIgual(negociacao) {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}
//# sourceMappingURL=negociacao.js.map