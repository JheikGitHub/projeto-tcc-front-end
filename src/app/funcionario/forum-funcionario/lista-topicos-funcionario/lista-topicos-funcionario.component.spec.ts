import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTopicosFuncionarioComponent } from './lista-topicos-funcionario.component';

describe('ListaTopicosFuncionarioComponent', () => {
  let component: ListaTopicosFuncionarioComponent;
  let fixture: ComponentFixture<ListaTopicosFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTopicosFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTopicosFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
