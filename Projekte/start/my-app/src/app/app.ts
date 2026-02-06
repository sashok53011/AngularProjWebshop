import { Component,
  inject,
  Signal,
  computed,
  signal  } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Copyright } from './copyright';
import { APP_SETTINGS, appSettings } from './app.setting';
import { Observable } from 'rxjs';
import { KeyLogger } from './key-logger/key-logger';
import { AuthComp } from './auth-comp/auth-comp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ProductList, Copyright, KeyLogger, AuthComp],
  templateUrl: './app.html',
  styleUrl: './app.css',
  /* providers: [
    { provide: APP_SETTINGS,
      useValue: appSettings}
  ] */
})
export class App {
  //title : Signal<string> = signal('');
  //title = 'World';
  // $ makieren der Observable-Variable, alle 2 Sekunden erneuern
  // Observable braucht hier einen generischen Datentyp, oder void dann
  // wird nur ein Signal übertragen.
 /*  title$ = new Observable<string>(observer => {
     setInterval(() => {
      observer.next(this.title());
    }, 2000);
  }) */

  settings = inject(APP_SETTINGS);

  //currentDate = signal(new Date());

  /* private setTitle = () => { 
    //const timestamp = new Date();
    // jetzt als Signal
    this.currentDate.set(new Date());        
    //this.title(`${this.settings.title} (${this.currentDate()})`);
  } */
  // subscribe, um im title$ Observable zu registrieren
  // und über Veränderungen informiert zu werden.
 /*  constructor() {
    this.title$.subscribe(this.setTitle);
    // computed für abgeleitete Signale
    this.title = computed(() => {
      return `${this.settings.title} (${this.currentDate()})`;
    });
  } */
}