import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarFotoComponent } from './alterar-foto.component';

describe('AlterarFotoComponent', () => {
  let component: AlterarFotoComponent;
  let fixture: ComponentFixture<AlterarFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
