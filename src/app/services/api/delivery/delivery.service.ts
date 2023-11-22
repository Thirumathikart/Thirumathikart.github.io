import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
import { httpResponse } from '../../../models/http';

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    headers!: HttpHeaders

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders()
            .set('Authorization', `${localStorage.getItem('jwt')}`);
    }

    base: string = environment.deliveryService;

    getCarrier(): Observable<any> {
        return this.httpClient.get<httpResponse>(`${this.base}/carrier`,
            {
                headers: this.headers
            });
    }

    updateCarrier(carrier:any): Observable<any> {
        return this.httpClient.put<httpResponse>(`${this.base}/carrier`,
            carrier,
            {
                headers: this.headers
            });
    }

    deleteCarrier(): Observable<any> {
        return this.httpClient.delete<httpResponse>(`${this.base}/carrier`,
            {
                headers: this.headers
            });
    }

}
