import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecuperarSenhaComponent } from './email-recuperar-senha.component';

describe('EmailRecuperarSenhaComponent', () => {
  let component: EmailRecuperarSenhaComponent;
  let fixture: ComponentFixture<EmailRecuperarSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRecuperarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRecuperarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
