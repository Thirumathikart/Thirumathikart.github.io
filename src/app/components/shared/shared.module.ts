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
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SupportComponent } from './support/support.component';

@NgModule({
  declarations: [
    AuthComponent,
    NotFoundComponent,
    ProfileComponent,
    UnauthorizedComponent,
    SupportComponent
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
  ],
  exports: [
    ProfileComponent,
    SupportComponent
  ],
})

export class SharedModule { }
