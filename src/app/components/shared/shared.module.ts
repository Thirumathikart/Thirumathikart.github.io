import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileComponent } from './profile/profile.component';
import { DividerModule } from 'primeng/divider';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SupportComponent } from './support/support.component';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AuthComponent,
    NotFoundComponent,
    ProfileComponent,
    UnauthorizedComponent,
    SupportComponent,
    OrderDetailsComponent 
  ],
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TableModule,
    PipeModule
  ],
  exports: [
    ProfileComponent,
    SupportComponent
  ],
})

export class SharedModule { }
