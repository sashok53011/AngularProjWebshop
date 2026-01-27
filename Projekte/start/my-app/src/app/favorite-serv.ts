import { Injectable } from '@angular/core';
import { Product } from './product';
import { Products } from './products'; // Import der Products-Service

@Injectable()

export class FavoriteServ extends Products {

  constructor() {
    super();
  }
  // Überschreiben der getProducts-Methode, um nur Favoriten zurückzugeben
  override getProducts(): Product[] {
    return super.getProducts().slice(1, 3); // Beispiel: Nur Produkte mit Index 1 und 2 zurückgeben
  }
  
}
