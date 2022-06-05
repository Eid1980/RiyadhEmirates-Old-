import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsViewComponent } from './latest-news-view.component';

describe('LatestNewsViewComponent', () => {
  let component: LatestNewsViewComponent;
  let fixture: ComponentFixture<LatestNewsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNewsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
