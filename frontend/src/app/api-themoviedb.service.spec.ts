import { TestBed } from '@angular/core/testing';

import { ApiThemoviedbService } from './api-themoviedb.service';

describe('ApiThemoviedbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiThemoviedbService = TestBed.get(ApiThemoviedbService);
    expect(service).toBeTruthy();
  });
});
