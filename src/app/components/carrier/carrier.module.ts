import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DeliveryComponent } from './delivery/delivery.component';
import { SharedModule } from '../shared/shared.module';
import { DeliveryOrdersComponent } from './orders/orders.component';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [
    DeliveryComponent,
    DeliveryOrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    TabViewModule,
    DividerModule,
    AvatarModule,
    InputSwitchModule,
    PipeModule
  ]
})
export class CarrierModule { }
