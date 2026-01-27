import { Component, input, OnInit } from '@angular/core';
import { ProductsView } from './products-view';
// Import des ProductsView-Services
import { Product } from '../product';
@Component({
  selector: 'app-product-view',
  imports: [],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
  providers: [ProductsView]
})
// Komponente zur Anzeige eines einzelnen Produkts
export class ProductView implements OnInit {
  id = input<number>();
  product: Product | undefined;
  // Injection des ProductsView-Services
  constructor(private productsView: ProductsView) {}
  // Lifecycle-Hook OnInit zur Initialisierung des Produkts
  ngOnInit() {
    this.product = this.productsView.getProduct(this.id()!);
  }
}
