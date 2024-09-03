export interface Imprimivel { // Toda interface é pública e todo método de uma interface é abstrato

    //constructor() {} // aqui fica implícito que essa classe possui um construtor, e ele deverá ser chamado pelas classes filhas através do método super()
    paraTexto(): string
}