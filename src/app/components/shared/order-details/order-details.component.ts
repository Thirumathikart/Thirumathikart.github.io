import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/api/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

    order!:any;

    constructor(
        public sanitizer: DomSanitizer,
        private orderService: OrderService,
        private route: ActivatedRoute,
        private messageService: MessageService){}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            const id = params['id'];
            this.getOrder(id);
     });
    }

    getOrder(id:string) {
        this.orderService.getOrderByID(id).subscribe(
            {
               next : (response:any) => { 
                    this.order = response.order;
                },
                error: error => {
                    this.messageService.add({ severity: 'error', summary: "Error", detail: 'Failed to Fetch, Try again Later' });
              }
            }
        );
    }

    getTotal() : any {
        var total = 0;
        for(const product of this.order.items){
            total+=(product.quantity * product.price);
        }
        return total + 60;
    }

    mapsurl(add:any){
        return `https://www.google.com/maps?q=${add.latitude},${add.longitude}&z=14&output=embed`
    }
}
