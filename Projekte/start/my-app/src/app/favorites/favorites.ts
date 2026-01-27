import { CommonModule } from '@angular/common'; // für die Slice-Pipe
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Products } from '../products';
import { FavoriteServ  } from '../favorite-serv'; // Import des Favorites-Services

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  providers: [
    { provide: Products, // Wenn jemand Products-Service anfragt,
     useClass: FavoriteServ }]  // dann instanziiere stattdessen FavoriteServ-Service
})
export class Favorites implements OnInit {
  products: Product[] = [];

  constructor(private productsService: Products) {} 

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

}
