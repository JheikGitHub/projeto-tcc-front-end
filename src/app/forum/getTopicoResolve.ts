import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TopicoDiscussao } from './topicos-discussao/topico-discussao';
import { ForumService } from './forun.service';

@Injectable()
export class GetTopicoNomeResolve implements Resolve<TopicoDiscussao> {

    constructor(private service: ForumService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TopicoDiscussao> {
        return this.service.buscaTopicoNome(route.paramMap.get('nomeTopico'));
    }
}
