import { Directive, input, numberAttribute } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';
import { priceMaximumValidator } from './price-maximum.validator';
//Direktive dient als Wrapper für die pricMaximumValidator Funktion
//als PriceMaximumValidator

@Directive({
  selector: '[appPriceMaximum]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PriceMaximum,
      multi: true
    }
  ]
})
export class PriceMaximum implements Validators{
  // hier packen wir ein Konfiguration-Objekt mit
  // 2 Properties in eine input-Funktion
  // die alias Property definiert den Namen der Input Property, der
  // Binding benutzt wird. Die transform Property wird benutzt,
  //um den Wert der Input Property in einen anderen Typ zu konvertieren
  // numberAttribute ist eine Build-In Funktion in Angular, die den Wert der 
  //Input-Property in den Typ number umwandelt.
  appPriceMaximum = input(undefined, {
    alias: 'threshold',
    transform: numberAttribute
  })
// Validate Methode des Validator-Interfac
// Die Signatur ist dieselbe die die Funktion priceMaximumValidator zurückgibt
// Sie checkt die appPriceMaximum Input Propery und delgiert sofort 
// den Wert zu priceMaximumValidator function
  validate(control: AbstractControl): ValidationErrors | null {
    return this.appPriceMaximum
      ? priceMaximumValidator(this.appPriceMaximum()!)(control)
      : null;
  }

  constructor() { }

}
