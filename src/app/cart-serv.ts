import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, defer, map } from 'rxjs';
import { CartInt } from './cart-int';
import { APP_SETTINGS } from './app.setting';

@Injectable({
  providedIn: 'root',
})
export class CartServ {
  cart: CartInt | undefined;
  private cartUrl = inject(APP_SETTINGS).apiUrl + '/carts';

  constructor(private http: HttpClient) {}


  // der defer-Operator arbeitet als if/else-Statement für Observable.
  // Wenn die Cart-Property nicht initialisiert wurde, also leer ist, 
  // wird eine POST-Anfrage gesendet, um die cartProduct-Variable als Parameter zu übergeben.
  // Ansonsten wird ein PUT-Request gesendet, um die cartProduct-Variable zum bestehenden Warenkorb hinzuzufügen.
  addProduct(id: number): Observable<CartInt> {
    const cartProduct = { productId: id, quantity: 1 };

    return defer(() => {
      // Wenn noch kein Warenkorb existiert, wird ein neuer per POST angelegt.
      if (!this.cart) {
        return this.http.post<CartInt>(this.cartUrl, { products: [cartProduct] });
      }
      // Ansonsten wird per PUT hinzugefügt. Bereits vorhandene Produkte
      // werden nach productId zusammengeführt, damit keine Duplikate entstehen,
      // sondern die Menge des bestehenden Eintrags erhöht wird.
      const products = this.cart.products.some(p => p.productId === id)
        ? this.cart.products.map(p =>
            p.productId === id
              ? { ...p, quantity: (p.quantity ?? 1) + 1 }
              : p
          )
        : [...this.cart.products, cartProduct];
      return this.http.put<CartInt>(`${this.cartUrl}/${this.cart.id}`, { products });
    }).pipe(map(cart => this.cart = cart));
  }
}
