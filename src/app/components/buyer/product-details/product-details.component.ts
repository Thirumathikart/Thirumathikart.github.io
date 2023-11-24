import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProductService } from 'src/app/services/api/product/product.service';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { StateService } from 'src/app/services/state/state.service';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    id! : string;
    product! : any;
    seller!: any;
    count: number = 1;
    cartGroup!: FormGroup;

    activeIndex : number = 0;

    constructor(
        private productService: ProductService,
        private userService: UserService,
        private stateService : StateService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) {
    }

    ngOnInit() : void {

      this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.get();
     });
    }


    goBack(): void {
        this.location.back();
      }


    increment() {
        if(this.count<this.product.stock)
        this.count+=1;
    }

    decrement() {
        if(this.count>1)
        this.count-=1;
    }

    get() {
        this.productService.getProductByID(this.id).subscribe(
            {
               next : (response:any) => { 
                    this.product = response.product;
                    this.getSeller(this.product.seller_id);
                },
                error: error => {
                  console.log(error.message);
              }
            }
        );
    }

    getSeller(seller_id:string) {
        this.userService.getUserByID(seller_id).subscribe(
            {
               next : (response:any) => { 
                    this.seller = response[0];
                },
                error: error => {
                  console.log(error.message);
              }
            }
        );
    }


    goToPayment(): void {
        this.product.quantity = this.count;
        this.stateService.setProductData([this.product]);
        this.router.navigate(['/payment']);
      }
}
