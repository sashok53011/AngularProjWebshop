import {Component,
  inject
   } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Copyright } from './copyright';
import { APP_SETTINGS } from './app.setting';
import { AuthComp } from './auth-comp/auth-comp';
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { CartServ } from './cart-serv';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    Copyright,
    AuthComp,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    MatBadge
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
})
export class App {

  settings = inject(APP_SETTINGS);
  cartService = inject(CartServ);

}
