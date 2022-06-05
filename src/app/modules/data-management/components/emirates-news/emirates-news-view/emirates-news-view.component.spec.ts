import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesNewsViewComponent } from './emirates-news-view.component';

describe('EmiratesNewsViewComponent', () => {
  let component: EmiratesNewsViewComponent;
  let fixture: ComponentFixture<EmiratesNewsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmiratesNewsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiratesNewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
