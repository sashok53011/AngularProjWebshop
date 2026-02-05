import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product'; // Import des Interface Product
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from '../sort-pipe';
import { Products } from '../products';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
// toSignal wandelt ein Observable in ein Signal um
import { ProductCreate } from '../product-create/product-create';

@Component({
  selector: 'app-product-list', //
  imports: [ProductDetail, SortPipe, ProductCreate],
  templateUrl: './product-list.html', // Pfad zur HTML-Vorlage
  styleUrl: './product-list.css', // Pfad zur CSS-Datei
  providers: [Products] // Registrierung des Products-Services
})
export class ProductList implements OnInit {
  // Property für die Liste der Produkte
  //products: Product[] = []; umwandeln,
  // porducts$ darf ein Observable mit Product-Array sein oder undefined
  products$: Observable<Product[]> | undefined;

  // DI des Products-Services
  private productsService = inject(Products);

  // Methode zum Abrufen der Produkte
  private getProducts() {
    this.products$ = this.productsService.getProducts();
  }
  // Kap.7, 2 Parameter werden an die toSignal-Funktion übergeben
  // das Observable, das wir umwandeln wollen und ein initialer Wert optional für das Signal
  products = toSignal(this.productsService.getProducts(), {initialValue: []});
  
  // Property für das ausgewählte Produkt
  selectedProduct: Product | undefined;

  // Verbindung um Event vom Kind zu empfangen, jetzt mit Produkt
  onAdded() {
    alert(`${this.selectedProduct?.title} wurde zum Warenkorb hinzugefügt.`);
  }
  // Dependency Injection des Products-Services
  //constructor(private productService: Products) {}

  // Lifecycle-Hook OnInit zur Initialisierung der Produktliste
  ngOnInit(): void {
    this.getProducts();
  }
}