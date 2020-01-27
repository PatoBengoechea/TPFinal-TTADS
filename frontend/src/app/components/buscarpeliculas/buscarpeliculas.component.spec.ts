import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarpeliculasComponent } from './buscarpeliculas.component';

describe('BuscarpeliculasComponent', () => {
  let component: BuscarpeliculasComponent;
  let fixture: ComponentFixture<BuscarpeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarpeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarpeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
