import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarAdminComponent } from './alterar-admin.component';

describe('AlterarAdminComponent', () => {
  let component: AlterarAdminComponent;
  let fixture: ComponentFixture<AlterarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
