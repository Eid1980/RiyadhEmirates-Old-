import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesNewsEditComponent } from './emirates-news-edit.component';

describe('EmiratesNewsEditComponent', () => {
  let component: EmiratesNewsEditComponent;
  let fixture: ComponentFixture<EmiratesNewsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmiratesNewsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiratesNewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
