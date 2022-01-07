import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component'
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: LandingPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shop', component: ShoppingPageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
