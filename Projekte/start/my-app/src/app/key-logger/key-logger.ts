import { Component, ElementRef, viewChild, input, OnInit } from '@angular/core';
import { fromEvent, tap, map, filter } from 'rxjs'; // fromEvent erzeugt ein Observable aus einem DOM-Event eines nativen HTML-Elements
// tap erlaubt Nebeneffekte im Datenstrom, ohne diesen zu verändern
@Component({
  selector: 'app-key-logger',
  imports: [],
  templateUrl: './key-logger.html',
  styleUrl: './key-logger.css',
})
export class KeyLogger {
  input = viewChild<ElementRef>('keyContainer');
  keys = '';
  numeric = input();
// der pipe-Operator verlinkt und kombiniert verschiedene Operatoren
// Filtern, Zahlen erlaubt, Buchstaben nicht
  ngOnInit(): void {
      const logger$ = fromEvent<KeyboardEvent>(this.input()!.nativeElement, 'keyup');
      logger$.pipe(
      map(evt => evt.key.charCodeAt(0)),
      filter(code => {
        if(this.numeric()) {
          return (code >31 && (code < 48 || code > 57)) === false;
        }
        return true;
      }),
      tap(digit => this.keys += String.fromCharCode(digit))
    ).subscribe();
  }
}
