import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/api/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
    orders!: any[]

    constructor(
        private router: Router,
        private orderService: OrderService,
        private messageService: MessageService
    ){}

    ngOnInit(): void {
        this.orderService.getAllOrder().subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    this.orders = response.orders as any[];       
                },
                error: error => {
                    this.messageService.add({ severity: 'error', summary: "Error", detail: 'Failed to Fetch, Try again Later' });
                }
            }
        );
    }

    onClick(id:string) {
        this.router.navigate(['/order'], { queryParams: { id: id } });
    }
 
}
