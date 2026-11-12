import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CartServ } from './cart-serv';
import { APP_SETTINGS, appSettings } from './app.setting';

describe('CartServ', () => {
  let service: CartServ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_SETTINGS, useValue: appSettings },
      ],
    });
    service = TestBed.inject(CartServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
