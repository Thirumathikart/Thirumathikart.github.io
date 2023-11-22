import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/api/product/product.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-inventory',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
    query: string = "";
    from: number = 0;
    size: number = 10;
    order: boolean = false;
    sort: string = "";
    products!: any[];

    constructor(
        private productService: ProductService,
        private router: Router,
        private location: Location) { }

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.productService.getInventory(this.query, this.from, this.size, this.sort, this.order).subscribe(
            {
                next: (response: any) => {
                    console.log(response);
                    this.products = response.products;
                },
                error: error => {
                    console.log(error.message);
                }
            }
        );
    }

    goBack(): void {
        this.location.back();
    }


    goToDetails(id: string): void {
        this.router.navigate(['inventory'], { queryParams: { id: id } });
    }

    addInventory() {
        this.router.navigate(['inventory']);
    }
}
