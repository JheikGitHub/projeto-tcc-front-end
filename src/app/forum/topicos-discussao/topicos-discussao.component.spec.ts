import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicosDiscussaoComponent } from './topicos-discussao.component';

describe('TopicosDiscussaoComponent', () => {
  let component: TopicosDiscussaoComponent;
  let fixture: ComponentFixture<TopicosDiscussaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicosDiscussaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicosDiscussaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
