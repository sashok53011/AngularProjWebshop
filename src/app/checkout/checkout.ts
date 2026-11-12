import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Mit dem MAT_DIALOG_DATA-Token können Daten in den Dialog injiziert werden, um 
// sie im Dialog anzuzeigen oder zu verwenden.


@Component({
  selector: 'app-checkout',
  imports: [MatButton, MatDialogModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  data = inject(MAT_DIALOG_DATA);

}
