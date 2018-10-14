import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTopicoComponent } from './editar-topico.component';

describe('EditarTopicoComponent', () => {
  let component: EditarTopicoComponent;
  let fixture: ComponentFixture<EditarTopicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTopicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
