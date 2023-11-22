import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuyerModule } from './components/buyer/buyer.module'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InplaceModule } from 'primeng/inplace';
import { AuthGuard } from './guard/auth.guard';
import { CacheService } from './services/cache/cache.service';
import { LoggedInAuthGuard } from './guard/user.guard';
import { ToastModule } from 'primeng/toast';
import { RoleGuard } from './guard/role.guard';
import { HttpClientModule } from '@angular/common/http';
import { SellerModule } from './components/seller/seller.module';
import { MessageService } from 'primeng/api';
import { CarrierModule } from './components/carrier/carrier.module';
import { LocationService } from './services/location/location.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    CacheService,
    AuthGuard,
    RoleGuard,
    LocationService,
    MessageService,
    LoggedInAuthGuard
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BuyerModule,
    SellerModule,
    CarrierModule,
    ToastModule,
    AppRoutingModule,
    InplaceModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
