import { escape } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> { // Como a classe pai é do tipo genérico, aqui estou passando o tipo que a filha irá passar para a classe pai

    @escape
    protected template(model: Negociacoes): string { // Esse método serve para declarar a view. Deixar o alicerce
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th> DATA </th>
                    <th> QUANTIDADE </th>
                    <th> VALOR </th>
                </tr>
            </thead>
            <tbody>
                ${model.lista().map(negociacao => {
                    return `
                    <tr>
                        <td>${this.formatar(negociacao.data)}</td>
                        <td>${negociacao.quant}</td>
                        <td>${negociacao.valor}</td>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
        `;
    }

    private formatar(data: Date): string {
        return new Intl.DateTimeFormat().format(data) 
    }
}