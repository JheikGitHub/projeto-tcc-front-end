import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarNovoUsuarioComponent } from './criar-novo-usuario.component';

describe('CriarNovoUsuarioComponent', () => {
  let component: CriarNovoUsuarioComponent;
  let fixture: ComponentFixture<CriarNovoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarNovoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarNovoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
