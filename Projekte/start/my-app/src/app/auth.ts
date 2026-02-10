import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { APP_SETTINGS } from './app.setting';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // HttpClient wird über DI bereitgestellt
  // Singals können nicht nur in der Angualar-Komponenten,
  // sondern auch in Services genutzt werden
  constructor(private http: HttpClient) {}
  private accessToken = signal('');
  // authUrl Property zeigt auf den Authentifizierungs-Endpunkt der API
  private authUrl = inject(APP_SETTINGS).apiUrl + '/auth';
  isLoggedIn = computed(() => this.accessToken() !== '');
  
  // hier wird ein Post-Request an die API gesendet, indem 
  // Benutzername und Passwort übergeben werden
  // und ein Observable mit dem Zugriffstoken zurückgegeben wird
  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(this.authUrl + '/login', {
      username, password
    }).pipe(
      // Zugriffstoken im Signal speichern
      tap(token => this.accessToken.set(token))
    );
  }
  logout() {
    // Zugriffstoken im Signal löschen
    this.accessToken.set('');
  }
}
