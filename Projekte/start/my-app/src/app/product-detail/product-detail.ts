import { CommonModule } from '@angular/common';
import { Component, inject,
  input,
  output,
  OnChanges 
  } from '@angular/core'; 
import { Product } from '../product';
import { Observable } from 'rxjs';
import { Products } from '../products';
import { Auth } from '../auth';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnChanges {
  // Input-Property für die Produkt-ID
  id = input<number>();
  //product = input<Product>();
  product$: Observable<Product> | undefined;

  constructor(private productsService: Products, public authService: Auth) {}

  added = output(); // Definition des Output-Events

  delete = output(); // Definition des Output-Events für das Löschen eines Produkts

  addToCart() {
    this.added.emit(); // Emit des Events, jetzt ohne Produkt-Objekt
  }

  /* get productTitle() {
    return this.product() ?.title;
  } */

  ngOnChanges(): void {
    this.product$ = this.productsService.getProduct(this.id()!)
  };
  // die Methode akzeptiert das Produkt-Objekt und den neuen Preis als Parameter
  // und ruft die updateProduct-Methode des Products-Services auf
  changePrice(product: Product, price: string) {
    this.productsService.updateProduct(product.id, Number(price)).subscribe();
  };
  // die Methode akzeptiert das Produkt-Objekt als Parameter und ruft die 
  // deleteProduct-Methode des Products-Services auf
  remove(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.delete.emit(); // Emit des Events nach erfolgreichem Löschen
    });
  }
}