import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';

import { Copyright } from './copyright';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, Copyright],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('World of Angular' );
}
