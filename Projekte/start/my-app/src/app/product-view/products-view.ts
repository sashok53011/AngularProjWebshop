import { Injectable } from '@angular/core';
import { Products } from '../products';
import { Product } from '../product';

@Injectable()
export class ProductsView {
  private product: Product | undefined;
  // Injection des Products-Services in ProductsView-Service, service-in-a-service
  constructor(private productsService: Products) {}

  // Methode zum Abrufen eines Produkts anhand der ID
  getProduct(id: number): Product | undefined {
    const products = this.productsService.getProducts();
    if(!this.product){this.product = products.find((product) => product.id === id)
    }
    return this.product;
  } 
}