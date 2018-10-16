import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class GetUserIdResolve implements Resolve<Observable<User>> {

    constructor(private service: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.service.buscaUsuario(route.paramMap.get('id'));
    }
}