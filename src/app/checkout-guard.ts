import { CanDeactivateFn } from '@angular/router';
import { Cart } from './cart/cart';
import { MatDialog } from '@angular/material/dialog';
import { Checkout } from './checkout/checkout';
import { inject } from '@angular/core';
import { CartServ } from './cart-serv';

export const checkoutGuard: CanDeactivateFn<Cart> = () => {
  // Die confirm-Funktion des globalen Window-Objekts wird genutzt, um
  // einen Bestätigungsdialog anzuzeigen, wenn der Benutzer versucht, die Seite zu verlassen.
  // Die Ausführung der Anwendung wird angehalten, bis der Benuzter eine Auswahl trifft.
  //const confirmation = confirm(
  //  'Sie haben Artikel im Warenkorb. Möchten Sie die Seite wirklich verlassen?'
  //)
  //return confirmation;

  // Hier wird der MatDialog-Service von Angular Material verwendet, um einen benutzerdefinierten Dialog anzuzeigen,
  //  anstatt die native confirm-Funktion zu verwenden.
  // Es wird eine afterClosed-Methode aufgerufen, die ein Observable zurückgibt, das den Wert 
  // des Dialogs zurückgibt, wenn er geschlossen wird.
  const cartService = inject(CartServ);
  const dialog = inject(MatDialog);
  if (cartService.cart) {  // Überprüfen, ob der Warenkorb existiert und eine bestimmte Anzahl an Artikeln enthält
    const confirmation = dialog.open(Checkout, { data: cartService.cart.products.length }).afterClosed();
    return confirmation;
  }
  // Wenn der Warenkorb leer ist, wird einfach true zurückgegeben, um den Navigationsvorgang zu ermöglichen.
  return true;
};
