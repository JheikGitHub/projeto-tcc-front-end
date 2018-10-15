import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { GetUserResolve } from '../user/get-user.resolve';
import { BuscaEventoResolve } from '../evento/busca-evento.resolve';

import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AdminMeusDadosComponent } from './meus-dados/meus-dados.component';
import { AdminAlterarDadosComponent } from './meus-dados/alterar-dados/alterar-dados.component';
import { AdminAlterarFotoComponent } from './meus-dados/alterar-foto/alterar-foto.component';
import { AdminAlterarSenhaComponent } from './meus-dados/alterar-senha/alterar-senha.component';
import { AdminAlterarEventoComponent } from './meus-eventos/alterar-evento/alterar-evento.component';
import { AdminMeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { AdminConfirmaPresencaComponent } from './meus-eventos/confirma-presenca/confirma-presenca.component';
import { AdminCriarEventoComponent } from './meus-eventos/criar-evento/criar-evento.component';
import { AdminDetalhesEventoComponent } from './meus-eventos/detalhes-evento/detalhes-evento.component';
import { AdminMinhasAgendaComponent } from './minhas-agenda/minhas-agenda.component';
import { AdminAlterarAgendaComponent } from './minhas-agenda/alterar-agenda/alterar-agenda.component';
import { BuscaAgendaResolve } from '../agenda/busca-agenda.resolve';
import { AdminCriarAgendaComponent } from './minhas-agenda/criar-agenda/criar-agenda.component';
import { AdminDetalhesAgendaComponent } from './minhas-agenda/detalhes-agenda/detalhes-agenda.component';
import { AdminUsuariosComponent } from './usuarios/usuarios.component';
import { DetalhesDadosUsuarioComponent } from './usuarios/detalhes-dados-usuario/detalhes-dados-usuario.component';
import { AlterarDadosUsuarioComponent } from './usuarios/alterar-dados-usuario/alterar-dados-usuario.component';
import { GetUserIdResolve } from '../user/get-user-id.resolve';
import { CriarNovoUsuarioComponent } from './usuarios/criar-novo-usuario/criar-novo-usuario.component';
import { ListaTopicosAdminComponent } from './forum-admin/lista-topicos-admin/lista-topicos-admin.component';
import { CriarTopicoAdminComponent } from './forum-admin/criar-topico-admin/criar-topico-admin.component';
import { EditarTopicoAdminComponent } from './forum-admin/editar-topico-admin/editar-topico-admin.component';
import { GetTopicoNomeResolve } from '../forum/getTopicoResolve';


const routes: Routes = [
    {
        path: '', component: AdminComponent, resolve: { user: GetUserResolve }, children: [
            { path: '', component: HomeAdminComponent },

            { path: 'meus-dados', component: AdminMeusDadosComponent, resolve: { user: GetUserResolve } },
            { path: 'meus-eventos', component: AdminMeusEventosComponent, resolve: { user: GetUserResolve } },
            { path: 'minhas-agendas', component: AdminMinhasAgendaComponent, resolve: { user: GetUserResolve } },

            { path: 'usuarios', component: AdminUsuariosComponent },
            { path: 'usuario/criar-usuario', component: CriarNovoUsuarioComponent },
            { path: 'usuario/detalhes/:id', component: DetalhesDadosUsuarioComponent },
            { path: 'usuario/alterar/:id', component: AlterarDadosUsuarioComponent, resolve: { user: GetUserIdResolve } },

            { path: 'criar-evento', component: AdminCriarEventoComponent },
            { path: 'criar-agenda', component: AdminCriarAgendaComponent, resolve: { user: GetUserResolve } },

            { path: 'alterar-senha', component: AdminAlterarSenhaComponent },
            { path: 'alterar-foto', component: AdminAlterarFotoComponent },
            { path: 'alterar-dados', component: AdminAlterarDadosComponent, resolve: { user: GetUserResolve } },
            { path: 'editar-agenda/:id', component: AdminAlterarAgendaComponent, resolve: { agenda: BuscaAgendaResolve } },
            { path: 'editar-evento/:id', component: AdminAlterarEventoComponent, resolve: { evento: BuscaEventoResolve } },

            { path: 'topicos/:nomeEvento', component: ListaTopicosAdminComponent },
            { path: 'topicos/:nomeEvento/criar-topico', component: CriarTopicoAdminComponent },
            { path: 'topicos/:nomeEvento/editar-topico/:nomeTopico', component: EditarTopicoAdminComponent, resolve: { nomeTopico: GetTopicoNomeResolve } },

            { path: 'meus-eventos/detalhes-evento/:id', component: AdminDetalhesEventoComponent },
            { path: 'minhas-agendas/detalhes-agenda/:id', component: AdminDetalhesAgendaComponent },
            { path: 'confirmacao-presenca/:id', component: AdminConfirmaPresencaComponent },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
