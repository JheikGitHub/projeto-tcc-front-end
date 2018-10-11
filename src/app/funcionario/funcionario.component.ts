import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../account/login/login.service';
import { User } from '../user/user';

@Component({
    selector: 'app-funcionario',
    templateUrl: './funcionario.component.html'
})
export class FuncionarioComponent implements OnInit {

    user: User;

    constructor(
        private routeActivated: ActivatedRoute,
        private tokem: LoginService,
        private router: Router) { }

    ngOnInit() {
        this.user = this.routeActivated.snapshot.data['user'];
    }

    logout() {
        this.tokem.removeToken();
        this.router.navigate(['/login'])
    }
}
