import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacaoCertificadoComponent } from './validacao-certificado.component';

describe('ValidacaoCertificadoComponent', () => {
  let component: ValidacaoCertificadoComponent;
  let fixture: ComponentFixture<ValidacaoCertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacaoCertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacaoCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
