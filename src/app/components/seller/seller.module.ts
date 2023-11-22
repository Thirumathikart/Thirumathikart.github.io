import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InventoryComponent } from './inventory/inventory.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    InventoryComponent,
    ProductsComponent,
    QueueComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    SpeedDialModule,
    TabViewModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
  ]
})
export class SellerModule { }
