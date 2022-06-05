import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesNewsListComponent } from './emirates-news-list.component';

describe('EmiratesNewsListComponent', () => {
  let component: EmiratesNewsListComponent;
  let fixture: ComponentFixture<EmiratesNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmiratesNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiratesNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
