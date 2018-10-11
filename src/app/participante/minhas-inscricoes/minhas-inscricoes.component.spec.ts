import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasInscricoesComponent } from './minhas-inscricoes.component';

describe('MinhasInscricoesComponent', () => {
  let component: MinhasInscricoesComponent;
  let fixture: ComponentFixture<MinhasInscricoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasInscricoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasInscricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
