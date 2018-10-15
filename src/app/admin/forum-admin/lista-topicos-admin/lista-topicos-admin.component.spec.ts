import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTopicosAdminComponent } from './lista-topicos-admin.component';

describe('ListaTopicosAdminComponent', () => {
  let component: ListaTopicosAdminComponent;
  let fixture: ComponentFixture<ListaTopicosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTopicosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTopicosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
