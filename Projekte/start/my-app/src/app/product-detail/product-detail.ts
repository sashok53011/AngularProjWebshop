import { CommonModule } from '@angular/common';
import { Component,input, output } from '@angular/core'; 
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = input<Product>();
  added = output<Product>(); // Definition des Output-Events als Product-Objekt

  addToCart() {
    this.added.emit(this.product()!); // Emit des Events mit dem aktuellen Produkt
  }

  get productTitle() {
    return this.product() ?.title;
  }
  
}
