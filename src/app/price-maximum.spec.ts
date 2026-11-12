import { TestBed } from '@angular/core/testing';
import { PriceMaximum } from './price-maximum';

describe('PriceMaximum', () => {
  it('should create an instance', () => {
    // input() kann nur in einem Injection-Kontext aufgerufen werden,
    // daher wird die Direktive innerhalb von runInInjectionContext erstellt.
    const directive = TestBed.runInInjectionContext(() => new PriceMaximum());
    expect(directive).toBeTruthy();
  });
});
