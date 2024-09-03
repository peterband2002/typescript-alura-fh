export function inspect( // Posso declarar o decorator dessa forma, caso eu saiba que não irei receber parâmetros
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const metodoOriginal = descriptor.value
    descriptor.value = function (...args: any[]) {
        console.log(`--- Método ${propertyKey}`)
        console.log(`------ Parâmetros ${JSON.stringify(args)}`) // O método JSON.stringfy() transforma um array ou um objeto em uma string de json
        const retorno = metodoOriginal.apply(this, args)
        console.log(`------ retorno: ${JSON.stringify(retorno)}`)
        return retorno
    }

    return descriptor
}