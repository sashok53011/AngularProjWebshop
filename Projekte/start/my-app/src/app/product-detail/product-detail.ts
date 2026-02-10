import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Product } from '../product';
import { Observable } from 'rxjs';
import { Products } from '../products';
import { Auth } from '../auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  // Input-Property für die Produkt-ID
  id = input<string>();
  product$: Observable<Product> | undefined;
  price: number | undefined;

  constructor(
    private productsService: Products,
    public authService: Auth,
    private route: ActivatedRoute,
    private router: Router) {}

   addToCart() {
   }
  // Lifecycle-Hook OnInit, um die Produktdetails zu laden, wenn die Komponente initialisiert wird
  // switchMap-Operator wird verwendet, um die Produktdetails basierend auf der ID aus der Route zu laden
  // ActivatedRoute enthält das paramMap-Observable, das die Parameter der aktuellen Route enthält
  ngOnInit(): void {
    this.product$ = this.productsService.getProduct(Number(this.id()!));
   };//Alternative zu SwitchMap, um die Produktdetails zu laden, wenn die ID sich ändert
   //Vorteil: Die Komponent ist simpler und es gibt keine asynchronen Aufrufe mit Observable
   // Man kann auf existierende Kompoenenten zugreifen mit input()- output()-Bindings und
   // dabei eine Route nutzen.

  // die Methode akzeptiert das Produkt-Objekt und den neuen Preis als Parameter
  // und ruft die updateProduct-Methode des Products-Services auf
  changePrice(product: Product) {
    this.productsService.updateProduct(
      product.id,
      this.price!
    ).subscribe(() => {
      this.router.navigate(['/products']); 
      // Nach der Aktualisierung des Produkts wird zur Produktliste navigiert
    });
  };
  // die Methode akzeptiert das Produkt-Objekt als Parameter und ruft die 
  // deleteProduct-Methode des Products-Services auf
  remove(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']); 
      // Nach dem Löschen eines Produkts wird zur Produktliste navigiert
    });
  }
}