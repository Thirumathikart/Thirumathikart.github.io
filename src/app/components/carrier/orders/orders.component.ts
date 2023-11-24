import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { OrderService } from 'src/app/services/api/order/order.service';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class DeliveryOrdersComponent {
    panels!: Map<String,any[]>
    headers!: String[];
    icons!: Map<String,PrimeIcons>;


    constructor(
        private orderService: OrderService,
        private messageService: MessageService,
        private router: Router
    ){}

    ngOnInit(): void {
       this.getOrders();
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

}
