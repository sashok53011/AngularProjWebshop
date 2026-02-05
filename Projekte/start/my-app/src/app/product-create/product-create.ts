import { Component } from '@angular/core';
import { Products } from '../products';

@Component({
  selector: 'app-product-create',
  imports: [],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {
  // Dependency Injection des Products-Services
  constructor(private productsService: Products) {}

  // Die Methode akzeptiert die Produktdetails als Parameter
  // und ruft die addProduct-Methode des Products-Services auf
  // Der Preis wird von string in number umgewandelt
  createProduct(title: string, price: string, category: string) {
  this.productsService.addProduct({
    title,
    price: Number(price),
    category
    }).subscribe();
  }
}
