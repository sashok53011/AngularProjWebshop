import { Component } from '@angular/core';
import { Product } from '../product'; // Import des Interface Product
import { ProductDetail } from '../product-detail/product-detail';

@Component({
  selector: 'app-product-list', // Der CSS-Selector für die Komponente
  imports: [ProductDetail],  // Keine zusätzlichen Importe erforderlich [],
                        // jetzt schon, die ProductDetail-Komponente wird registriert
  templateUrl: './product-list.html', // Pfad zur HTML-Vorlage
  styleUrl: './product-list.css', // Pfad zur CSS-Datei
})
export class ProductList {
  // Liste von Produkten basierend auf dem Interface
  products: Product[] = [
    { id: 1, title: 'Keyboard' },
    { id: 2, title: 'Microphone' },
    { id: 3, title: 'Web camera' },
    { id: 4, title: 'Tablet' }
  ];
  // Property für das ausgewählte Produkt
  selectedProduct: Product | undefined;

  // Verbindung um Event vom Kind zu empfangen, jetzt mit Produkt
  onAdded(product: Product) {
    alert(`${product.title} wurde zum Warenkorb hinzugefügt.`);
  }
}

