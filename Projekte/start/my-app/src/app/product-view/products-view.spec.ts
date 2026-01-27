import { TestBed } from '@angular/core/testing';

import { ProductsView } from './products-view';

describe('ProductsView', () => {
  let service: ProductsView;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsView);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
