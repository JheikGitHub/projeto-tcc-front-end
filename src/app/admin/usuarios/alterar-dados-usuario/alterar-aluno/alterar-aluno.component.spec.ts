import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarAlunoComponent } from './alterar-aluno.component';

describe('AlterarAlunoComponent', () => {
  let component: AlterarAlunoComponent;
  let fixture: ComponentFixture<AlterarAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
