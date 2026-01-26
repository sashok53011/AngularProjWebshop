import { CommonModule } from '@angular/common';
import { Component,input, output, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'; 
import { Product } from '../product';
import { Numeric } from '../numeric';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, Numeric],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
 //encapsulation: ViewEncapsulation.None // Keine Kapselung der Stile
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
