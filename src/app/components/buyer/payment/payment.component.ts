import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { OrderService } from 'src/app/services/api/order/order.service';
import { StateService } from 'src/app/services/state/state.service';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
    addressID!: string;
    address!: any[];
    products!: any[];
    disable = false;
    paymentMode: string ='cod';
    activeIndex: number = 0;
    items = [
        {
            label: 'Address',
        },
        {
            label: 'Payment',
        },
        {
            label: 'Summary',
        }
    ];

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    constructor(
        private userService: UserService,
        private orderService: OrderService,
        private stateService: StateService,
        private router: Router){}


    ngOnInit() {
        this.getAddress();
        this.products = this.stateService.getProductData();
    }

    getAddress() {
        this.userService.getAddress().subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    this.address = response.address as any[];       
                },
                error: error => {
                    console.log(error.message);
                }
            }
        );
    }

    getTotal() : any {
        var total = 0;
        for(const product of this.products){
            total+=(product.quantity * product.price);
        }
        return total;
    }

    addAddress() {
        this.router.navigate(['/address']);
    }

    backHome() {
        this.router.navigate(['/home']);
    }

    placeOrder() {
        const order = {
            address_id: this.addressID,
            seller_id: this.products[0].seller_id,
            items: [
                {
                    id: this.products[0]._id,
                    quantity: this.products[0].quantity
                }
            ]
        };
        this.orderService.placeOrder(order).subscribe(
            {
                next : (response:any) => { 
                    console.log(response);
                    this.activeIndex = 2;  
                    this.disable = true;
                },
                error: error => {
                    console.log(error.message);
                }
            }
        );
    }
}
