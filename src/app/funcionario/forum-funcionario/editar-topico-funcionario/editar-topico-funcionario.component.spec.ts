import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTopicoFuncionarioComponent } from './editar-topico-funcionario.component';

describe('EditarTopicoFuncionarioComponent', () => {
  let component: EditarTopicoFuncionarioComponent;
  let fixture: ComponentFixture<EditarTopicoFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTopicoFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTopicoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
