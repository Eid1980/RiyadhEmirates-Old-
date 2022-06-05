import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsAddComponent } from './latest-news-add.component';

describe('LatestNewsAddComponent', () => {
  let component: LatestNewsAddComponent;
  let fixture: ComponentFixture<LatestNewsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNewsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
