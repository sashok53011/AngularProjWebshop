import { Component } from '@angular/core';
import { Auth } from '../auth';
import { MatButton} from '@angular/material/button';
// Angular Material Button

@Component({
  selector: 'app-auth-comp',
  imports: [MatButton],
  templateUrl: './auth-comp.html',
  styleUrl: './auth-comp.css',
})
export class AuthComp {
  //Auth-Service wird der Public Access Modifier genuztzt,
  // damit er in der HTML-Vorlage verwendet werden kann
  constructor(public authService: Auth) {}

  login() {
    this.authService.login('david_r', '3478*#54').subscribe();
  }

  logout() {
    this.authService.logout();
  }
}

