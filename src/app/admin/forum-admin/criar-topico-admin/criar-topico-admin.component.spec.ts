import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTopicoAdminComponent } from './criar-topico-admin.component';

describe('CriarTopicoAdminComponent', () => {
  let component: CriarTopicoAdminComponent;
  let fixture: ComponentFixture<CriarTopicoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTopicoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTopicoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
