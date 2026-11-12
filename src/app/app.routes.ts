import { Routes } from '@angular/router';
import { Cart} from './cart/cart';
import { ProductList } from './product-list/product-list';
import { ProductCreate } from './product-create/product-create';
import { ProductDetail } from './product-detail/product-detail';
import { authGuard } from './auth-guard';
import { checkoutGuard } from './checkout-guard';
import { productsResolver } from './products-resolver';

// Hier werden die Routen der Anwendung definiert.
export const routes: Routes = [
    { path: 'products', component: ProductList, resolve: { products: productsResolver } },
    { path: 'products/new', component: ProductCreate },
    // Die Route für die Produktdetails enthält einen dynamischen Parameter ':id',
    // der die ID des Produkts repräsentiert, das angezeigt werden soll.
    { path: 'products/:id', component: ProductDetail },
    // canActivate Property ist ein Array, viele Guards können hier hinzugefügt werden, in diesem Fall wird der authGuard verwendet.
    // Die Reihenfolge der Guards im Array ist wichtig. Wenn ein Guard den Zugriff verweigert oder
    // ausfällt, werden die nachfolgenden Guards nicht mehr ausgeführt ubnd der Zugriff auf die Route wird verweigert.
    { path: 'cart', component: Cart, canActivate: [authGuard], canDeactivate: [checkoutGuard] },
    //Die loadChildren Property eines Route-Objekts wird verwendet, 
    // um Lazy Loading für ein Modul zu nutzen. 
    { path: 'user', loadChildren: () => import('./user.routes'),
        canMatch: [authGuard]
     },

    // Standardroute, die auf die Produktliste weiterleitet,
    // wenn kein spezifischer Pfad angegeben ist
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    // Wildcard-Route für ungültige Pfade, muss am Ende der Routenliste stehen,
    // um alle nicht definierten Pfade abzufangen
    { path: '**', redirectTo: '/products' }
];
