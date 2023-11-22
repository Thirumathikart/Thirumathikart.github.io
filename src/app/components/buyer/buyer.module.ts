import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PaymentComponent } from './payment/payment.component';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriesComponent,
    ProductComponent,
    ProductDetailsComponent,
    PaymentComponent,
    AddressComponent,
    OrdersComponent,
    CategoriesComponent,
  ],
  imports: [
    SharedModule,
    CheckboxModule,
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ChipModule,
    ImageModule,
    TabViewModule,
    ReactiveFormsModule,
    AvatarModule,
    AvatarGroupModule,
    StepsModule,
    FormsModule,
    TableModule,
    DividerModule,
    RadioButtonModule,
  ]
})
export class BuyerModule { }
