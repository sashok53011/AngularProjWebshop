import { Component, OnInit } from '@angular/core';
//Modifizieren um die Cart-Items anzuzeigen.
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { Product } from '../product';
import { CartServ } from '../cart-serv';
import { Products } from '../products';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule, MatInput, MatFormField, MatError, MatLabel],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit{
  // Hier wurde ein FormGroup-Objekt erstellt, das
  // eine Product Property enthält. Der Wert der Product Property
  //wird als Instanz einer FormArray-Klasse gesetzt. Der Konstruktor
  // der FormArray-Klasse akzeptiert eine Liste von FormControl-Instanzen
  // mit dem Typ number als Parameter. Die Liste ist leer, solange
  // Cart keine Produkte enthält. Die Products Property außerhalb 
  // der FormGroup-Instanz wird aus Gründen der Übersichtlichkeit erstellt,
  //  um die Titel von jedem Produkt im Warenkorb anzuzeigen.
  cartForm = new FormGroup({
    products: new FormArray<FormControl<number>>([])
  });
  products: Product[] = [];

  constructor(
    private cartService: CartServ,
    private productsService: Products) {}
  
  // Lifecycle-Hook OnInit zur Initialisierung des Warenkorbs
  ngOnInit(): void {
    this.getProducts();
    // buildForm() wird nicht hier aufgerufen, weil getProducts()
    // asynchron ist und die Produkte zum Zeitpunkt des Aufrufs
    // noch nicht vorliegen. Das Formular wird stattdessen
    // nach dem Empfang der Produkte in getProducts() gebaut.
  }

  private getProducts() {
    this.productsService.getProducts().subscribe( products => {
        this.cartService.cart?.products.forEach(item => {
        const foundProduct = products.find(p => p.id === item.productId);
        if (foundProduct) {
          this.products.push(foundProduct);
        }
      })
      // Formular erst jetzt bauen, wenn this.products befüllt ist
      this.buildForm();
    })
    
  }
  // Methode um das Formular zu bauen.
  // Wir iterieren über die Products-Property und fügen
  // eine FormControl-Instanz für jedes Produkt innerhalb des FormArrays hinzu.
  // Der Anfangswert jeder FormControl-Instanz ist 1, was die Standardmenge 
  // für jedes Produkt im Warenkorb darstellt.
  private buildForm() {
    this.products.forEach(() => {
      this.cartForm.controls.products.push(
        new FormControl(1, { nonNullable: true })
      );
    });
  } 
}