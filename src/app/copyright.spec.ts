import { ElementRef } from '@angular/core';
import { Copyright } from './copyright';

describe('Copyright', () => {
  it('should create an instance', () => {
    const directive = new Copyright(new ElementRef(document.createElement('span')));
    expect(directive).toBeTruthy();
  });
});
