import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AgendaService } from './agenda.service';
import { Agenda } from './agenda';


@Injectable()
export class BuscaAgendaResolve implements Resolve<Observable<Agenda>> {

    constructor(private agendaService: AgendaService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.agendaService.getAgendaId(route.paramMap.get('id'));
    }
}
