import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Copyright } from './copyright';
import { APP_SETTINGS, appSettings } from './app.setting';
import { Observable } from 'rxjs';
import { KeyLogger } from './key-logger/key-logger';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, Copyright, KeyLogger],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [
    { provide: APP_SETTINGS,
      useValue: appSettings}
  ]
})
export class App {
  title = 'World';
  // $ makieren der Observable-Variable, alle 2 Sekunden erneuern
  // Observable braucht hier einen generischen Datentyp, oder void dann
  // wird nur ein Signal übertragen.
  title$ = new Observable<string>(observer => {
     setInterval(() => {
      observer.next(this.title);
    }, 2000);
  })

  settings = inject(APP_SETTINGS);

  private setTitle = () => { 
    const timestamp = new Date();        
    this.title = `${this.settings.title} (${timestamp})`;
  }
  // subscribe, um im title$ Observable zu registrieren
  // und über Veränderungen informiert zu werden.
  constructor() {
    this.title$.subscribe(this.setTitle);
  }
}
