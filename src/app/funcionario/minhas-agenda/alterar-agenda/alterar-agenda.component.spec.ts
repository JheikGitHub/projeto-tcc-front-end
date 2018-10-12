import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarAgendaComponent } from './alterar-agenda.component';

describe('AlterarAgendaComponent', () => {
  let component: AlterarAgendaComponent;
  let fixture: ComponentFixture<AlterarAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
