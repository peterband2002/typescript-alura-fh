export abstract class View<T> { // Aqui o tipo de entrada da classe é genérico("T"), então, serão as classes filhas que passaram o tipo ao herdarem
    // Pelo fato de ser uma classe abstrata, não faz sentido criar instâncias dessa classe, apenas herança
    protected elemento: HTMLElement
    //private escapar = false // esse valor será atribuído sempre quando o usuário chamar o método, mas não especificar o parâmetro

    //constructor(seletor: string, escapar?: boolean) { // O '?' indica que a passagem desse parâmetro é opcional. Porém, ao indicar isso, o parâmetro deverá ser tratado para caso seja verdadeiro
        // Porém, um parâmetro obrigatório nunca pode vir depois de um opcional

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor)
        if (elemento) { // Depois de ativar o strictnullchecks, tive que tratar esse retorno do HTML
            this.elemento = elemento as HTMLElement // Aqui estou fazendo uma conversão explícita de para um elemento de HTML
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`)
        }
        //this.elemento = document.querySelector(seletor) // Aqui estou capturndo o que foi passado
        //como parâmetro pelo construtor, e atribuindo às manipulações do DOM pelo querySelector
        // if (escapar) {
        //     this.escapar = escapar; // aqui se trata do tratamento da passagem verdadeira(true) do parâmetro 'escapar'
        // }
    }

    public update(model: T): void { // Esse método serve para renderizar o "template()"
        let template = this.template(model)
        // if(this.escapar) {
        //     template = template.replace(/<script>[\s\S]*?<\/script>/, '') // Essa expressão regular remove qualquer tag script lançada no código
        // }
        this.elemento.innerHTML = template
    }

    protected abstract template(model: T): string // Ao definir que um método é abstrato, será de responsabilidaed da classe filha implementar esse método.
    // Caso contrário, um erro será informado em tempo de compilação

}