import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { OrderService } from 'src/app/services/api/order/order.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent  implements OnInit {
    panels!: Map<String,any[]>
    headers!: String[];
    icons!: Map<String,PrimeIcons>;

    constructor(
        private orderService: OrderService,
        private router: Router,
        private messageService: MessageService
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
                    this.panels.set('New', orders.filter(order => order.status === "ORDERED"));
                    this.panels.set('Accepted', orders.filter(order => order.status === "ACCEPTED")); 
                    this.panels.set('Packed',orders.filter(order => order.status === "ENROUTE"));
                    this.panels.set('Shipped',orders.filter(order => order.status === "SHIPPED"));
                    this.panels.set('Delivered',orders.filter(order => order.status === "DELIVERED"));
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

    setIcons() {
        this.icons = new Map<String,PrimeIcons>();
        this.icons.set('New',PrimeIcons.INBOX);
        this.icons.set('Accepted',PrimeIcons.CHECK);
        this.icons.set('Packed',PrimeIcons.SHOPPING_BAG);
        this.icons.set('Shipped',PrimeIcons.TRUCK);
        this.icons.set('Delivered',PrimeIcons.VERIFIED);
    }
    updateStatus(status:string,id:string) {
        this.orderService.patchOrderByID(status,id).subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    this.getOrders();
                    if(status == "PREPARED") {
                        this.router.navigate(['queue'], { queryParams: { id: id } });  
                    } else {
                        this.messageService.add({ severity: 'success', summary: response.message, detail: `${status} Successfully` });
                    }
                }, 
                error: error => {
                    console.log(error.message);
                    this.messageService.add({ severity: 'error', summary: "Error", detail: 'Failed to Update' });
                }
            }
        );
    }

}
