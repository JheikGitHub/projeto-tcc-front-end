import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDadosUsuarioComponent } from './detalhes-dados-usuario.component';

describe('DetalhesDadosUsuarioComponent', () => {
  let component: DetalhesDadosUsuarioComponent;
  let fixture: ComponentFixture<DetalhesDadosUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesDadosUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesDadosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
