import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { DeliveryService } from 'src/app/services/api/delivery/delivery.service';
import { OrderService } from 'src/app/services/api/order/order.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
    isAvailable!:boolean;

    panels!: Map<String,any[]>
    headers!: String[];
    icons!: Map<String,PrimeIcons>;


    constructor(
        private deliveryService: DeliveryService,
        private orderService: OrderService,
        private locationService: LocationService,
        private messageService: MessageService,
        private router: Router
    ){}

    ngOnInit(): void {
       this.getCarrierStatus();
       this.getOrders();
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
    

    getOrders() {
        this.orderService.getAllOrder().subscribe(
            {
                next : (response:any) => { 
                    const orders = response.orders as any[];
                    this.panels = new Map<String,any[]>();
                    this.panels.set('New', orders.filter(order => order.status === "PREPARED"));
                    this.panels.set('Enroute', orders.filter(order => order.status === "ENROUTE")); 
                    this.panels.set('Shipped', orders.filter(order => order.status === "SHIPPED")); 
                    this.panels.set('Done',orders.filter(order => order.status === "DELIVERED"));
                    this.setIcons();
                    this.headers =  Array.from(this.panels.keys());
                },
                error: error => {
                    console.log(error.message);
                    this.messageService.add({ severity: 'error', summary: "Error", detail: 'Failed to Fetch' });
                }
            }
        );
    }

    updateStatus(status:string,id:string) {
        this.orderService.patchOrderByID(status,id).subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    this.getOrders();
                    this.messageService.add({ severity: 'success', summary: response.message, detail: `${status} Successfully` });
                    
                }, 
                error: error => {
                    console.log(error.message);
                    this.messageService.add({ severity: 'error', summary: "Error", detail: 'Failed to Update' });
                }
            }
        );
    }

    setIcons() {
        this.icons = new Map<String,PrimeIcons>();
        this.icons.set('New',PrimeIcons.INBOX);
        this.icons.set('Enroute',PrimeIcons.DIRECTIONS);
        this.icons.set('Shipped',PrimeIcons.TRUCK);
        this.icons.set('Done',PrimeIcons.VERIFIED);
    }

    onProfileClick() {
        this.router.navigate(['/profile'])
    }

}
