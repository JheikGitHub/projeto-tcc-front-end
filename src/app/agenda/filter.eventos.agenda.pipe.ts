import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEventosAgenda'
})
export class FilterEventosAgendaPipe implements PipeTransform {

  transform(eventos: any[], parametroBusca: string): any[] {
    
    if(!eventos) return [];
    if(!parametroBusca) return eventos;

    return eventos.filter(it => {
      return it.Nome.toLowerCase().includes(parametroBusca.toLowerCase()) || it.TipoEvento.toLowerCase().includes(parametroBusca.toLowerCase()) ;
    })

  }

}
