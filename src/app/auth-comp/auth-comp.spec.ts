import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthComp } from './auth-comp';
import { APP_SETTINGS, appSettings } from '../app.setting';

describe('AuthComp', () => {
  let component: AuthComp;
  let fixture: ComponentFixture<AuthComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComp],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_SETTINGS, useValue: appSettings },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
