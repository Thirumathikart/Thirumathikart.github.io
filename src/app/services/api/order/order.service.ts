import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
import { httpResponse } from '../../../models/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    headers!: HttpHeaders
    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('jwt')}`);
     }
  
    base:string = environment.orderService;

    placeOrder(order:any):Observable<any> {
        return this.httpClient.post<httpResponse>(this.base+"/order",
        order,
        {
            headers: this.headers
        });
    }

    getAllOrder():Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+"/order",
        {
            headers: this.headers
        });
    }

    getOrderByID(id:string):Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+`/order/${id}`,
        {
            headers: this.headers
        });
    }

    patchOrderByID(status:string, id:string):Observable<any> {
        return this.httpClient.patch<httpResponse>(this.base+`/order/${id}`, 
        {
            status: status
        },
        {
            headers: this.headers
        });
    }
}
