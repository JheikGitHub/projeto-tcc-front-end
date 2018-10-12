import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasAgendaComponent } from './minhas-agenda.component';

describe('MinhasAgendaComponent', () => {
  let component: MinhasAgendaComponent;
  let fixture: ComponentFixture<MinhasAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
