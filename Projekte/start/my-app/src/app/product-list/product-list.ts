import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product'; // Import des Interface Product
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from '../sort-pipe';
import { Products } from '../products';

import { Observable } from 'rxjs';
//import { AsyncPipe } from '@angular/common';
// Problem der Wartbarkeit besteht noch immmer.
// Die Komponenten unsubscriben von ihren Observables bisher manuell.
//Lösung: die asynchrone Pipe (AsyncPipe) von Angular verwenden

import { toSignal } from '@angular/core/rxjs-interop';
// toSignal wandelt ein Observable in ein Signal um

@Component({
  selector: 'app-product-list', //
  imports: [ProductDetail, SortPipe],
  templateUrl: './product-list.html', // Pfad zur HTML-Vorlage
  styleUrl: './product-list.css', // Pfad zur CSS-Datei
  providers: [Products] // Registrierung des Products-Services
})
export class ProductList implements OnInit {
  // Property für die Liste der Produkte
  //products: Product[] = []; umwandeln in Observable
  products$: Observable<Product[]> | undefined;

  // Kap.7, 2 Parameter werden an die toSignal-Funktion übergeben
  // das Observable, das wir umwandeln wollen und ein initialer Wert optional für das Signal
  products = toSignal(inject(Products).getProducts(), {initialValue: []});
  
  // Methode zum Abrufen der Produkte
  // Subskription, Unsubskription nicht mehr nötig, da AsyncPipe verwendet wird
  private getProducts() {
    this.products$ = this.productService.getProducts();
  }
 // der Pipe_Operator wird verwendet, um den takeUntilDestroyed-Operator
 //  mit der Subskription aus der getProducts-Methode des Products-Services
 //  zu verknüpfen

  // Property für das ausgewählte Produkt
  selectedProduct: Product | undefined;

  // Verbindung um Event vom Kind zu empfangen, jetzt mit Produkt
  onAdded(product: Product) {
    alert(`${product.title} wurde zum Warenkorb hinzugefügt.`);
  }
  // Dependency Injection des Products-Services
  constructor(private productService: Products) {}
  // Lifecycle-Hook OnInit zur Initialisierung der Produktliste
  ngOnInit(): void {
    this.getProducts();
  }

  /* ngOnDestroy(): void {
    // Abonnement kündigen, um Speicherlecks zu vermeiden; Kapitel 6
    // Die unsubscribe-Methode wird aufgerufen, um einen Observer
    // von den Active Listeners einer Subscription zu entfernen
    this.productsSub?.unsubscribe();
  } */
}