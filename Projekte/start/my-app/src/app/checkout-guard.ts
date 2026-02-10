import { CanDeactivateFn } from '@angular/router';
import { Cart } from './cart/cart';

export const checkoutGuard: CanDeactivateFn<Cart> = () => {
  // Die confirm-Funktion des globalen Window-Objekts wird genutzt, um
  // einen Bestätigungsdialog anzuzeigen, wenn der Benutzer versucht, die Seite zu verlassen.
  // Die Ausführung der Anwendung wird angehalten, bis der Benuzter eine Auswahl trifft.
  const confirmation = confirm(
    'Sie haben Artikel im Warenkorb. Möchten Sie die Seite wirklich verlassen?'
  )
  return confirmation;
};
