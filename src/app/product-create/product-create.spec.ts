import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ProductCreate } from './product-create';
import { APP_SETTINGS, appSettings } from '../app.setting';

describe('ProductCreate', () => {
  let component: ProductCreate;
  let fixture: ComponentFixture<ProductCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCreate],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: APP_SETTINGS, useValue: appSettings },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
