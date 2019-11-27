import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { popularMoviesComponent } from './popular-movies.component';

describe('popularMoviesComponent', () => {
  let component: popularMoviesComponent;
  let fixture: ComponentFixture<popularMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ popularMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(popularMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
