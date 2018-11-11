import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './guarda-rotas/auth.guard';
import { UsuarioGuard } from './guarda-rotas/usuario.guard';
import { HomeComponent } from './home/home/home.component';
import { AgendaComponent } from './agenda/agenda/agenda.component';
import { EventoComponent } from './agenda/evento/evento.component';
import { TopicosDiscussaoComponent } from './forum/topicos-discussao/topicos-discussao.component';
import { ComentariosComponent } from './forum/comentarios/comentarios.component';
import { ValidacaoCertificadoComponent } from './validacao-certificado/validacao-certificado/validacao-certificado.component';

const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'eventos/:nome-agenda', component: AgendaComponent },
    {
        path: 'eventos/:nome-agenda/:nome-evento', component: EventoComponent,
        children: [
            { path: '', component: TopicosDiscussaoComponent },
            { path: 'forum/:topico-discussao', component: ComentariosComponent }
        ]
    },

    {path: 'validar-certificado', component: ValidacaoCertificadoComponent},

    {
        path: 'admin-dashboard',
        loadChildren: '../app/admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
        canActivateChild: [UsuarioGuard]
    },

    {
        path: 'funcionario-dashboard',
        loadChildren: '../app/funcionario/funcionario.module#FuncionarioModule',
        canActivate: [AuthGuard],
        canActivateChild: [UsuarioGuard]
    },

    {
        path: 'participante-dashboard',
        loadChildren: '../app/participante/participante.module#ParticipanteModule',
        canActivate: [AuthGuard],
        canActivateChild: [UsuarioGuard]
    },

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
