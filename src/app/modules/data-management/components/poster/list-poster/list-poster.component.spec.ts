import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPosterComponent } from './list-poster.component';

describe('ListPosterComponent', () => {
  let component: ListPosterComponent;
  let fixture: ComponentFixture<ListPosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
