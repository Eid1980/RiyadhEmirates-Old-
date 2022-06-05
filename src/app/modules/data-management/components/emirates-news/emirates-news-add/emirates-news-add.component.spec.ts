import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesNewsAddComponent } from './emirates-news-add.component';

describe('EmiratesNewsAddComponent', () => {
  let component: EmiratesNewsAddComponent;
  let fixture: ComponentFixture<EmiratesNewsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmiratesNewsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiratesNewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
