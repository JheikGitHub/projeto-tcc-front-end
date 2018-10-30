import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService } from '../account/login/login.service';

@Injectable({ providedIn: 'root' })
export class UsuarioGuard implements CanActivateChild {
    constructor(
        private token: LoginService,
        private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let usuario: any;
        usuario = JSON.parse(this.token.getPerfil());

        if (usuario.perfil.toLowerCase() == "participante" && state.url.includes('/participante-dashboard')) {
            return true;
        }

        if (usuario.perfil.toLowerCase() == "moderador" && state.url.includes('/funcionario-dashboard')) {
            return true;
        }

        if (usuario.perfil.toLowerCase() == "admin" && state.url.includes('/admin-dashboard')) {
            return true;
        }

        this.router.navigate(['/nao-encontrado']);
        return false;
    }
}