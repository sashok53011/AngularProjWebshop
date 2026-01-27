import { TestBed } from '@angular/core/testing';

import { FavoriteServ } from './favorite-serv';

describe('FavoriteServ', () => {
  let service: FavoriteServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
