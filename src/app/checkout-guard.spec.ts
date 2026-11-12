import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { checkoutGuard } from './checkout-guard';
import { Cart } from './cart/cart';

describe('checkoutGuard', () => {
  const executeGuard: CanDeactivateFn<Cart> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkoutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
