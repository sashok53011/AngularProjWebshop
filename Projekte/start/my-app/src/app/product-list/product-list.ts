import { Component, OnInit } from '@angular/core';
import { Product } from '../product'; // Import des Interface Product
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from '../sort-pipe';
import { Products } from '../products';
import  { ProductView } from '../product-view/product-view';
import { Favorites } from '../favorites/favorites'; // Import der Favorites-Komponente

@Component({
  selector: 'app-product-list', // Der CSS-Selector für die Komponente
  imports: [ProductDetail, SortPipe, ProductView, Favorites],  // Keine zusätzlichen Importe erforderlich [],
                        // jetzt schon, die ProductDetail-Komponente wird registriert
  templateUrl: './product-list.html', // Pfad zur HTML-Vorlage
  styleUrl: './product-list.css', // Pfad zur CSS-Datei
  providers: [Products]
})
export class ProductList implements OnInit {
  
  products: Product[] = [];

  // Property für das ausgewählte Produkt
  selectedProduct: Product | undefined;

  // Verbindung um Event vom Kind zu empfangen, jetzt mit Produkt
  onAdded(product: Product) {
    alert(`${product.title} wurde zum Warenkorb hinzugefügt.`);
  }

  constructor(private productService: Products) {}
  
  // Lifecycle-Hook OnInit zur Initialisierung der Produktliste
  ngOnInit() {
  this.products = this.productService.getProducts();
  }
}