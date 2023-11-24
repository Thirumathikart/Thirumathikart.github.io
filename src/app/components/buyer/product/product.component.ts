import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/api/product/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit  {
    category!: string;
    query:string = "";
    from:number=0;
    size:number=10;
    order: boolean = false;
    sort:string = "";
    products!:any[];

    constructor(
        private productService: ProductService, 
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.category = params['category'];
            this.search()
        });
    }

    search() {
        this.productService.searchProduct(this.query,this.from,this.size,this.category,this.sort,this.order).subscribe(
            {
              next : (response:any) => { 
                    console.log(response);
                    this.products = response.products;
                },
                error: error => {
                  console.log(error.message);
              }
            }
        );
    }

    onSearch() {
        setTimeout(() => { 
             this.search();
        }, 1000);
    }
    
    goBack(): void {
        this.location.back();
      }


    goToDetails(id:string): void {
        this.router.navigate(['/product'], { queryParams: { id: id } });
      }
}
