import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn | CanMatchFn = () => {
  // AuthService und Router-Service werden mit der inject-Funktion abgerufen,
  // es wird dann der Wert des isLoggedIn-Signals überprüft,
  // bei true wird der Zugriff auf die Route erlaubt,
  // andernfalls wird die parseUrl-Methode des Router-Service aufgerufen,
  // um den Benutzer zum Wurzelpfad ("/") weiterzuleiten, was in diesem Fall die Produktliste ist.
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Zugriff erlauben, wenn der Benutzer eingeloggt ist
  }
  return router.parseUrl('/');
};
