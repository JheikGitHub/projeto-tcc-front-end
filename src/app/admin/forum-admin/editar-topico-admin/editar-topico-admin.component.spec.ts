import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTopicoAdminComponent } from './editar-topico-admin.component';

describe('EditarTopicoAdminComponent', () => {
  let component: EditarTopicoAdminComponent;
  let fixture: ComponentFixture<EditarTopicoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTopicoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTopicoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
