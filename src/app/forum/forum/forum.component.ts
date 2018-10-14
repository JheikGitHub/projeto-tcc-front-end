import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from '../forun.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicoDiscussao } from '../topicos-discussao/topico-discussao';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  private topicosDiscussao: TopicoDiscussao[] = [];

  @Input() nomeEvento: string = '';
  @Input() rota: string = '';
  @Input() rotaEditar: string = '';
  
  constructor(
    private service: ForumService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.service.getAllTopicosDiscussao(this.nomeEvento).subscribe(topicoDiscussao => {
      this.topicosDiscussao = topicoDiscussao
    })
  }
  deleta(topicoId) {
    let respota = confirm("Deseja realmente excluir esse topico?")
    if (respota) {
      this.service.deletaTopico(topicoId).subscribe(
        () => {
          alert('Agenda Excluida com sucesso!');
          
          this.router.navigate([this.rota]);
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            alert("Usuario invalido.");
            this.router.navigate(['/login'])
          }
          else
            alert("Falha ao excluir topíco.");
        }
      );
    }
  }
}
