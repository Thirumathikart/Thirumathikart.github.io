import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
import { httpResponse } from '../../../models/http';


@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    headers!: HttpHeaders

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('jwt')}`);
    }
  
    base: string = environment.productService;

    getCategories() : Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+`/category`, {headers:this.headers})
    }

    getProductByID(id : string) : Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+`/product/${id}`, {headers:this.headers})
    }

    getInventory(query:string, from: number, size: number, sort:string, order:boolean) :Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+`/inventory?query=${query}&from=${from}&size=${size}&sort=${sort}&order=${order}`,{
            headers: this.headers
        });
    }

    addProduct(product:any) :Observable<any> {
        return this.httpClient.post<httpResponse>(this.base+`/inventory`, product,
        {
            headers: this.headers
        });
    }

    updateProduct(id: string,product:any) :Observable<any> {
        return this.httpClient.put<httpResponse>(this.base+`/inventory/${id}`, product,
        {
            headers: this.headers
        });
    }

    searchProduct(query:string, from: number, size: number, category:string, sort:string, order:boolean) :Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+`/product?query=${query}&from=${from}&size=${size}&category=${category}&sort=${sort}&order=${order}`,{
            headers: this.headers
        });
    }

}
  