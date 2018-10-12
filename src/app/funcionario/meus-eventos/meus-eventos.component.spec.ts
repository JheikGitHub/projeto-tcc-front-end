import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusEventosComponent } from './meus-eventos.component';

describe('MeusEventosComponent', () => {
  let component: MeusEventosComponent;
  let fixture: ComponentFixture<MeusEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
