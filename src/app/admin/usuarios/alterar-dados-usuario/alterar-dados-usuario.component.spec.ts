import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDadosUsuarioComponent } from './alterar-dados-usuario.component';

describe('AlterarDadosUsuarioComponent', () => {
  let component: AlterarDadosUsuarioComponent;
  let fixture: ComponentFixture<AlterarDadosUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarDadosUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarDadosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
