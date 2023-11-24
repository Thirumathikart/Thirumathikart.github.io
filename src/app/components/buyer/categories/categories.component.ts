import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/api/product/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    categories!:any[];

    constructor(private productService:ProductService, public router: Router){}

    ngOnInit(): void {
        this.productService.getCategories().subscribe(
            {
              next : (response:any) => { 
                    console.log(response);
                    for(let [index, cat] of response.categories.entries()) {
                        response.categories[index].image = `categories/${cat.image}`
                    }
                    this.categories = response.categories;
                },
                error: error => {
                  console.log(error.message);
              }
            }
        );
    }


    navigateProductsList(category: string) {
        this.router.navigate(['/products'], { queryParams: { category: category } });
    }
}
