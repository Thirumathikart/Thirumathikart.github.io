import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { DeliveryService } from 'src/app/services/api/delivery/delivery.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
    isAvailable!:boolean;

    selectedMenu = 2;
    menus: any[] = [
        {
            index: 0,
            label: 'Home',
            icon: PrimeIcons.HOME
        },
        {
            index: 1,
            label: 'Profile',
            icon: PrimeIcons.USER
        },
        {
            index: 2,
            label: 'Support',
            icon: PrimeIcons.GLOBE
        }
    ];


    constructor(
        private deliveryService: DeliveryService,
        private locationService: LocationService,
        private messageService: MessageService,
        private router: Router
    ){}

    ngOnInit(): void {
       this.getCarrierStatus();
    }

    onSwitchChange(event: any) {
        const status = event.checked? 0 : -1;
        this.update(status);
    }


    getCarrierStatus() {
        this.deliveryService.getCarrier().subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    this.isAvailable = true;
                }, 
                error: error => {
                    console.log(error.message);
                    if (error instanceof HttpErrorResponse && error.error) {
                        console.log('Error Response Body:', error.error);
                        if(error.error === 'Not Found'){
                            this.isAvailable = false;
                        }else  if(error.error ==='Action Not Permitted When Order is Active') {
                            this.isAvailable = true;
                        }
                    }
                  
                }
            }
        );
    }
    
    async update(status:number) {
        const location = await this.locationService.getPosition();
        const carrier = {
            status: status,
            ...location
        }
        this.deliveryService.updateCarrier(carrier).subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    const detail = status == 0?  'Your Now Ready To Recieve Orders' : 'Your Wont Recieve Orders' 
                    this.isAvailable = status == 0;
                    this.messageService.add({ severity: 'success', summary: "Success", detail: detail });
                }, 
                error: error => {
                    console.log(error.message);
                    if (error instanceof HttpErrorResponse && error.error) {
                        console.log('Error Response Body:', error.error);
                        if(error.error === 'Not Found'){
                            this.isAvailable = false;
                        }else  if(error.error.message ==='Action Not Permitted When Order is Active') {
                            this.isAvailable = true;
                        }
                    }
                    this.messageService.add({ severity: 'error', summary: "Error", detail: error.error.message });
                }
            }
        );
    }
}
