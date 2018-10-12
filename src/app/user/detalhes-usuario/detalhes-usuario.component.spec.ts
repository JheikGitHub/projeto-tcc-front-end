import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesUsuarioComponent } from './detalhes-usuario.component';

describe('DetalhesUsuarioComponent', () => {
  let component: DetalhesUsuarioComponent;
  let fixture: ComponentFixture<DetalhesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
