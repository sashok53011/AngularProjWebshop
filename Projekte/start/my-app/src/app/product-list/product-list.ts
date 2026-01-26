import { Component } from '@angular/core';
import { Product } from '../product'; // Import des Interface Product
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from '../sort-pipe';

@Component({
  selector: 'app-product-list', // Der CSS-Selector für die Komponente
  imports: [ProductDetail, SortPipe],  // Keine zusätzlichen Importe erforderlich [],
                        // jetzt schon, die ProductDetail-Komponente wird registriert
  templateUrl: './product-list.html', // Pfad zur HTML-Vorlage
  styleUrl: './product-list.css', // Pfad zur CSS-Datei
})
export class ProductList {
  // Liste von Produkten basierend auf dem Interface
  products: Product[] = [
    { id: 1,
       title: 'Keyboard',
      price: 100,
      categories: {1: 'Computing', 2: 'Peripherals'}},
    { id: 2,
      title: 'Microphone',
      price: 35,
      categories: {3: 'Mulitmedia'}},
    { id: 3,
      title: 'Web camera',
      price: 79,
      categories: {1: 'Computing', 3: 'Mulitmedia'}},
    { id: 4,
      title: 'Tablet',
      price: 500,
      categories: {4: 'Entertainment'}},
  ];
  // Property für das ausgewählte Produkt
  selectedProduct: Product | undefined;

  // Verbindung um Event vom Kind zu empfangen, jetzt mit Produkt
  onAdded(product: Product) {
    alert(`${product.title} wurde zum Warenkorb hinzugefügt.`);
  }
}

