import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsEditComponent } from './latest-news-edit.component';

describe('LatestNewsEditComponent', () => {
  let component: LatestNewsEditComponent;
  let fixture: ComponentFixture<LatestNewsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNewsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
