export function escape(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const metodoOriginal = descriptor.value
    descriptor.value = function(...args: any[]) {
        let retorno =  metodoOriginal.apply(this, args)
        if(typeof retorno == 'string') {
            // console.log(`@escape em ação na classe ${this.constructor.name} para o método ${propertyKey}`) // O comando this.constructor.name, é para pegar o nome da classe. Vem do JS
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '')
        }
        return retorno
    }

    return descriptor
}