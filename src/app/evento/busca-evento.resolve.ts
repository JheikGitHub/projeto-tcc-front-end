import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EventoService } from './evento.service';
import { Evento } from './evento';


@Injectable()
export class BuscaEventoResolve implements Resolve<Observable<Evento>> {

    constructor(private service: EventoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.service.buscaEventoId(route.paramMap.get('id'));
    }
}