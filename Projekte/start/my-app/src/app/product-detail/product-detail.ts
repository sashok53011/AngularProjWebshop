import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Product } from '../product';
import { Observable, switchMap } from 'rxjs';
import { Products } from '../products';
import { Auth } from '../auth';
import { FormsModule } from '@angular/forms';
import { CartServ } from '../cart-serv';
import { PriceMaximum } from '../price-maximum';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, PriceMaximum,
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatChipSet,
    MatChip,
    MatSnackBarModule
  ],
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
    private router: Router,
    private cartService: CartServ,
    private snackBar: MatSnackBar
  ) {}

  // Methode zum Hinzufügen eines Produkts zum Warenkorb
   addToCart(id: number) {
     this.cartService.addProduct(id).subscribe(()=> {
      // Nach dem Hinzufügen eines Produkts zum Warenkorb wird eine Snackbar-Nachricht angezeigt, um den Benutzer zu informieren.
      this.snackBar.open('Produkt zum Warenkorb hinzugefügt', 'OK', { duration: 3000 })
     });
   }
  // Lifecycle-Hook OnInit, um die Produktdetails zu laden, wenn die Komponente initialisiert wird
  // switchMap-Operator wird verwendet, um die Produktdetails basierend auf der ID aus der Route zu laden
  // ActivatedRoute enthält das paramMap-Observable, das die Parameter der aktuellen Route enthält

   ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.productsService.getProduct(Number(params.get('id')));
      })
    );
  }  

  //ngOnInit(): void {
  //  this.product$ = this.productsService.getProduct(Number(this.id()!));
 //  };//Alternative zu SwitchMap, um die Produktdetails zu laden, wenn die ID sich ändert
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