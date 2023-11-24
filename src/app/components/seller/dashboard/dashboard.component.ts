import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { OrderService } from 'src/app/services/api/order/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    orders!: any[];
    selectedMenu = 0;
    menus: any[] = [
        {
            index: 0,
            label: 'Home',
            icon: PrimeIcons.HOME
        },
        {
            index: 1,
            label: 'Products',
            icon: PrimeIcons.TAGS
        },
        {
            index: 2,
            label: 'Profile',
            icon: PrimeIcons.USER
        },
        {
            index: 3,
            label: 'Info',
            icon: PrimeIcons.INFO_CIRCLE
        }
    ];
    

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
