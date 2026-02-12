import { HttpClient, HttpParams } from '@angular/common/http';
// HttpParams für Such- und Filter-Parameter
import { Injectable, inject } from '@angular/core';
import { Product } from './product';
import { Observable, map, of, tap } from 'rxjs';
import { APP_SETTINGS } from './app.setting';

@Injectable(
  { providedIn: 'root' }
)

export class Products {
  private products: Product[] = [];
      
  // API URL aus den App-Einstellungen holen
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';

  // HttpClient wird über DI bereitgestellt
  constructor(private http: HttpClient) {}

  // Nutze HttpClient, um die Produkte von der API zu laden
  // und gibt ein Observable mit einem Product-Array zurück
  getProducts(limit?: number): Observable<Product[]> {
    // Wenn es keine Produkte im lokalen Array gibt, lade sie von der API
    if (this.products.length === 0) {
      const options = new HttpParams().set('limit', limit ||'10');
      // Hinzufügen der Parameter zum GET-Request
      return this.http.get<Product[]>(this.productsUrl, {
        params: options
      }).pipe(map(products => {
      this.products = products;
      return products;
      }));
    }
    return of(this.products);
  };
   
  
  // Kap. 8 Umbau der Product-Detail-Methode, die Pruduktdetails von der API lädt,
  // indem sie Http-Get Request nutzt
  // Methode akzeptiert die Produkt-ID als Parameter und initiiert einen GET-Request
  // zu der API, die auf dieser ID basiert.
  // Modifiziert, nutzt das Product-Array um ein Produkt-Objekt zurückzugeben
  // anstelle der Fake-API
  getProduct(id: number): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    //return this.http.get<Product>(`${this.productsUrl}/${id}`)
    return of(product!);
  };
  // Die Post-Mehtode des HttpClient wird genutzt und durchläuft den Product-Endpunkt
  // der API, um ein neues Produkt-Objekt als Parameter zu übergeben.
  // Ebenso wird das neue Proudukt dem lokalen Product-Array, dem Cache hinzugefügt.
  // und zurückgegeben.
  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      // Hinzufügen des neuen Produkts zum lokalen Array
      map(product => {
        this.products.push(product);
        return product;
      })
    );
  };
  // Methode zum Aktualisieren des Preises eines Produkts
  // Nutzt die Patch-Methode des HttpClient, um die Produktdetail zu senden,
  // die wir in der API aktualisieren möchten. Ebenso wird das lokale Product-Array aktualisiert.
  updateProduct(id: number, price: number): Observable<Product> {
    return this.http.patch<Product>(`${this.productsUrl}/${id}`, { price }).pipe(
      map(product => {
        const index = this.products.findIndex(p => p.id === id);
        this.products[index].price = price;
        return product;
      })
    );
  }
  // Methode zum Löschen eines Produkts
  // Nutzt die Delete-Methode des HttpClient, um die Produktdetail zu senden,
  // die wir in der API löschen möchten. Ebenso wird das lokale Product-Array aktualisiert.
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`).pipe(
      tap(() => {
        const index = this.products.findIndex(p => p.id === id);
        // die Funktion splice() mit den Parametern index und 1, um das Produkt aus dem Array zu entfernen
        // index gibt die Position des Produkts im Array an, und 1 gibt an, dass nur ein Element entfernt werden soll
        this.products.splice(index, 1);
      })
    );
  };
}
