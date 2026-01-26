import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class Numeric {

  @HostBinding('class') currentClass = '';
  @HostListener('keypress', ['$event']) onKeyPress(event:
    KeyboardEvent) {
      const charCode = event.key.charCodeAt(0);
      // Prüfen, ob das eingegebene Zeichen eine Zahl ist (ASCII-Werte 48-57)
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        this.currentClass = 'invalid-input';
        event.preventDefault(); // Verhindert die Eingabe
      }else {
          this.currentClass = 'valid-input';
        }
      }

  constructor() { }

}
