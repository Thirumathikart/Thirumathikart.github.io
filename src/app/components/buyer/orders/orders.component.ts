import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/api/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
    orders!: any[]

    constructor(
        private orderService: OrderService,
    ){}

    ngOnInit(): void {
        this.orderService.getAllOrder().subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    this.orders = response.orders as any[];       
                },
                error: error => {
                    console.log(error.message);
                }
            }
        );
    }

}
