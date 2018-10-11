import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusCertificadosComponent } from './meus-certificados.component';

describe('MeusCertificadosComponent', () => {
  let component: MeusCertificadosComponent;
  let fixture: ComponentFixture<MeusCertificadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusCertificadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
