import { Routes } from '@angular/router';
import { Cart} from './cart/cart';
import { ProductList } from './product-list/product-list';
import { ProductCreate } from './product-create/product-create';
// Hier werden die Routen der Anwendung definiert.
export const routes: Routes = [
    { path: 'products', component: ProductList },
    { path: 'products/new', component: ProductCreate },
    { path: 'cart', component: Cart }
];
