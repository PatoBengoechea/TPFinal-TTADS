import { TestBed, inject } from '@angular/core/testing';

import { ApiThemoviedbService } from './api-themoviedb.service';

describe('ApiThemoviedbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiThemoviedbService]
    });
  });

  it('should be created', inject([ApiThemoviedbService], (service: ApiThemoviedbService) => {
    expect(service).toBeTruthy();
  }));
});
