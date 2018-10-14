import { Pipe, PipeTransform } from '@angular/core';
import { Agenda } from './agenda';

@Pipe({
    name: 'filterAgenda'
})

export class FilterAgendaPipe implements PipeTransform {
    transform(agendas: Agenda[], parametroBusca: string): any[] {
        if (!agendas) return [];
        if (!parametroBusca) return agendas;

        return agendas.filter(it => {
            return it.Nome.toLowerCase().includes(parametroBusca.toLowerCase());
        })

    }
}