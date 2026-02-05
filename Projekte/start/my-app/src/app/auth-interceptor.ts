import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

// Auth-Interceptor, der alle HTTP-Anfragen abfängt und einen 
// Authorization-Header mit einem Token hinzufügt
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const authReq = req.clone({
    setHeaders: { Authorization: 'myToken'}
  });
  return next(authReq);
}