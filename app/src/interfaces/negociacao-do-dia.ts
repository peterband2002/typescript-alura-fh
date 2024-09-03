export interface NegociacoesDoDia { // Essa interface está servindo para tipar os campos em json que vieram da api
    montante: number // caso alguém troque o nome da propriedade no json, eu posso renomear na própria interface, com o F2 - Rename Symbol, para que altere em todo o meu projeto
    vezes: number
}