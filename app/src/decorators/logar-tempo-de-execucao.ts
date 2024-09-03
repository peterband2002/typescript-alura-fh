export function logarTempoDeExecucao(emSegundos: boolean = false) { // ao definir um valor para o parâmetro, na chamada eu posso omitir a passagem que ele irá assumir o valor pré-definido
    return function(
        target: any, // se o decorator estiver encima de um método estático de uma classe, ele será uma função construtora, e se estiver em um método que não é estático, ele vai ser o protótipo.
        propertyKey: string, // ele dá um nome do método que foi decorado, em formato string
        descriptor: PropertyDescriptor // ele sabe tudo sobre o método que queremos executar, pois tem uma referência para o método original
    ) {
        const metodoOriginal = descriptor.value // aqui estou capturando o método da classe na qual o descriptor está encima, e armazenando
        descriptor.value = function(...args: Array<any>) { // através do descriptor.value, estou obtendo a implementação do método decorado
                                                           // ainda estou passando com parâmetros uma quantidade indefinida deles, para a função

            let divisor = 1
            let unidade = 'milissegundos'
            if(emSegundos) {
                divisor = 1000
                unidade = 'segundos'
            }
            const t1 = performance.now()

            // chamar o método original
            const retorno = metodoOriginal.apply(this, args) // através do aplly() estou chamando a execução do metodoOringial, passando o contexto de this, o conteúdo do bloco atual, e utilizando os parâmetros do array vindo do desciptor.value
 
            const t2 = performance.now()
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/divisor} ${unidade}`)
            retorno
        }

        return descriptor
    }
}