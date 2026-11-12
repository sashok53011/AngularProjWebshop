
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from './product';
import { Products } from './products';

// Resolver-Funktion, die vor der Aktivierung einer Route ausgeführt wird, um Daten zu laden
//

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productService = inject(Products);
  // Hier wird die getProducts-Methode des Products-Services aufgerufen, um die Produktliste zu laden.
  // Das Ergebnis wird zurückgegeben und steht der Route zur Verfügung, bevor sie aktiviert wird.
  const limit = Number(route.queryParamMap.get('limit'));
  return productService.getProducts(limit);
};
