import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(agendas: any[], parametroBusca: string): any[] {
    if(!agendas) return [];
    if(!parametroBusca) return agendas;

    parametroBusca = parametroBusca.toLowerCase();

    return agendas.filter( it => {
     return it.Nome.toLowerCase().includes(parametroBusca);
    });

  }

}
