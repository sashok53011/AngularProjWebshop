import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyLogger } from './key-logger';

describe('KeyLogger', () => {
  let component: KeyLogger;
  let fixture: ComponentFixture<KeyLogger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyLogger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyLogger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
