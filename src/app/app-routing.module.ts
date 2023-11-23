import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/buyer/payment/payment.component';
import { RoleGuard } from './guard/role.guard';
import { ProductComponent } from './components/buyer/product/product.component';
import { ProductDetailsComponent } from './components/buyer/product-details/product-details.component';
import { AuthComponent } from './components/shared/auth/auth.component';
import { LoggedInAuthGuard } from './guard/user.guard';
import { AddressComponent } from './components/buyer/address/address.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { HomeComponent } from './components/buyer/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { DashboardComponent } from './components/seller/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { ProductsComponent } from './components/seller/products/products.component';
import { InventoryComponent } from './components/seller/inventory/inventory.component';
import { QueueComponent } from './components/seller/queue/queue.component';
import { DeliveryComponent } from './components/carrier/delivery/delivery.component';
import { UnauthorizedComponent } from './components/shared/unauthorized/unauthorized.component';


export const routes: Routes = [
    { 
        path: 'payment', 
        component: PaymentComponent,
        canActivate: [RoleGuard],
        data: {role: 1}
    },
    { 
        path: 'products', 
        component: ProductComponent,
        canActivate: [RoleGuard],
        data: {role: 1}  
    },
    { 
        path: 'product', 
        component: ProductDetailsComponent,
        canActivate: [RoleGuard],
        data: {role: 1} 
    },
    { 
        path: 'auth', 
        component: AuthComponent,
        canActivate: [LoggedInAuthGuard] 
    },
    { 
        path: 'address', 
        component: AddressComponent,
        canActivate: [AuthGuard],
    },
    { 
        path: 'profile', 
        component: ProfileComponent, 
        canActivate: [AuthGuard], 
    },
    { 
        path: 'home', 
        component:HomeComponent, 
        canActivate: [RoleGuard],
        data: {role: 1} 
    },
    { 
        path: 'queue', 
        component: QueueComponent, 
        canActivate: [RoleGuard],
        data: {role: 2} 
    },
    { 
        path: 'inventory', 
        component: InventoryComponent, 
        canActivate: [RoleGuard],
        data: {role: 2} 
    },
    { 
        path: 'products', 
        component: ProductsComponent, 
        canActivate: [RoleGuard],
        data: {role: 2} 
    },
    { 
        path: 'seller', 
        component: DashboardComponent, 
        canActivate: [RoleGuard],
        data: {role: 2} 
    },
    { 
        path: 'delivery', 
        component: DeliveryComponent, 
        canActivate: [RoleGuard],
        data: {role: 3} 
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
    },
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
