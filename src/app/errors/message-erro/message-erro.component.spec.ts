import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageErroComponent } from './message-erro.component';

describe('MessageErroComponent', () => {
  let component: MessageErroComponent;
  let fixture: ComponentFixture<MessageErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
