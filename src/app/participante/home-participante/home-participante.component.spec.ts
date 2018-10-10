import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeParticipanteComponent } from './home-participante.component';

describe('HomeParticipanteComponent', () => {
  let component: HomeParticipanteComponent;
  let fixture: ComponentFixture<HomeParticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
