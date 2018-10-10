import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVoltarComponent } from './menu-voltar.component';

describe('MenuVoltarComponent', () => {
  let component: MenuVoltarComponent;
  let fixture: ComponentFixture<MenuVoltarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVoltarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVoltarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
