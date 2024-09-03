export function domInjector(seletor: string) {
    return function(target: any, propertyKey: string) { // taget é o protótipo da classe, quem a define
        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey}`)

        let elemento: HTMLElement

        const getter = function() { // Esse getter sempre vai verificar se 'elemento' já existe.
            // Caso não, então executará a atribuição do if a seguir. Caso não, ele já irá retornar o elemento que está em cache

            if(!elemento) {
                elemento = <HTMLElement>document.querySelector(seletor)
                console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`)
            }
            
            return elemento
        }

        Object.defineProperty( // como tenho acesso ao protótipo da classe, agora posso pegá-lo,
            // pegar a propertyKey e settar o get para set a propriedade que eu criei (getter)
            target,
            propertyKey,
            {get: getter}
        )
    }
}