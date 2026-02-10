import { Component,
  inject
   } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Copyright } from './copyright';
import { APP_SETTINGS } from './app.setting';
import { AuthComp } from './auth-comp/auth-comp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,Copyright, AuthComp],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
})
export class App {
  
  settings = inject(APP_SETTINGS);

}