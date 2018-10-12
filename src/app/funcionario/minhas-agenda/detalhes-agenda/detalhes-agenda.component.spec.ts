import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAgendaComponent } from './detalhes-agenda.component';

describe('DetalhesAgendaComponent', () => {
  let component: DetalhesAgendaComponent;
  let fixture: ComponentFixture<DetalhesAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
