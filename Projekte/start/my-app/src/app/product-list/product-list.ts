import { AsyncPipe, CurrencyPipe } from '@angular/common'; // Import für AsyncPipe, um Observable in der Vorlage zu verwenden
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product'; // Import des Interface Product
import { SortPipe } from '../sort-pipe';
import { Products } from '../products';
import { Observable, switchMap, of, map } from 'rxjs';
//import { toSignal } from '@angular/core/rxjs-interop';
// toSignal wandelt ein Observable in ein Signal um
import { ActivatedRoute, RouterLink } from '@angular/router'; // Import für RouterLink, um Navigation zu ermöglichen
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';


@Component({
  selector: 'app-product-list', //
  imports: [ SortPipe, RouterLink, AsyncPipe, CurrencyPipe,
     MatMiniFabButton, MatIcon, MatCardModule, MatTableModule,
    MatButtonToggle,
    MatButtonToggleGroup],
  templateUrl: './product-list.html', // Pfad zur HTML-Vorlage
  styleUrl: './product-list.css', // Pfad zur CSS-Datei
  })

export class ProductList implements OnInit {
  
  products$: Observable<Product[]> | undefined;
  columnNames = ['title', 'price' ]
  
  // Methode zum Abrufen der Produkte
  // Prefetching: Produkte werden bereits geladen,
  //  bevor die Route aktiviert wird, um eine schnellere Anzeige zu ermöglichen
  // Das Data-Observable der ActivatedRoute enthält die Daten, die von einem Resolver
  //  bereitgestellt werden, bevor die Route aktiviert wird.
  // switchMap-Operator gibt die Produkte in einem neuen Observable zurück, das von der Route bereitgestellt wird.
  private getProducts() {
    this.products$ = this.route.data.pipe(
      switchMap(data => of(data['products'])));
  }
  // Dependency Injection des ActivatedRoute, um auf die Daten der aktuellen Route zuzugreifen
  constructor(private productService: Products, private route: ActivatedRoute) {}

  // Lifecycle-Hook OnInit zur Initialisierung der Produktliste
  ngOnInit(): void {
    this.getProducts();
  }
}