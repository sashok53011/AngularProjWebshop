import { Component } from '@angular/core';
import { Products } from '../products';
import{ Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// Validator und Validator Property für Reatvive Forms

import { priceMaximumValidator } from '../price-maximum.validator';
//eigenen Validator importieren

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {
  // Dependency Injection des Products-Services und des Router-Services
  constructor(
    private productsService: Products,
    private router: Router,
    ) {}

 createProduct() {
    this.productsService.addProduct(
      this.productForm!.value).subscribe(() => {
        this.router.navigate(['/products']);
    });
  // Nach dem Hinzufügen eines Produkts wird zur Produktliste navigiert
  }

  productForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: 
        Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), priceMaximumValidator(1000)]
    }),
    category: new FormControl('', { nonNullable: true})
  });

  /* private buildForm() {
    this.productForm = this.builder.nonNullable.group({
      title: [''],
      price: this.builder.nonNullable.control<number |
        undefined>(undefined),
        category: ['']
    });
  } */
  
  /* ngOnInit(): void {
    this.buildForm();
  } */
}
