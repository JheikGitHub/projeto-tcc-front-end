import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTopicoFuncionarioComponent } from './criar-topico-funcionario.component';

describe('CriarTopicoFuncionarioComponent', () => {
  let component: CriarTopicoFuncionarioComponent;
  let fixture: ComponentFixture<CriarTopicoFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTopicoFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTopicoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
