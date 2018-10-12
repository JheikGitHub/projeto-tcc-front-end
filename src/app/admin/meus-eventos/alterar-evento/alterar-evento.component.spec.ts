import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarEventoComponent } from './alterar-evento.component';

describe('AlterarEventoComponent', () => {
  let component: AlterarEventoComponent;
  let fixture: ComponentFixture<AlterarEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
