import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
// Property Binding interagiert mit der Property des DOM-Elements
// Event Binding interagiert mit dem Event des DOM-Elements
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('World of Angular' );
}
