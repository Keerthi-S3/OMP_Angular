import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SubscribeProductComponent } from './subscribe-product/subscribe-product.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },  
    { path: 'home', component: HomeComponent }, 
    {path:'product', component:ProductComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent },
    {path:'subscribe-product/:id', component: SubscribeProductComponent}
    
];
