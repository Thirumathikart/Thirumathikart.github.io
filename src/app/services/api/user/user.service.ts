import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/env';
import { httpResponse } from '../../../models/http';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    headers!: HttpHeaders
    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders()
        .set('Authorization', `${localStorage.getItem('jwt')}`);
     }
  
    base:string = environment.userService;

    login(user: any):Observable<any> {
        return this.httpClient.post<httpResponse>(this.base+"/login",user);
    }

    register(user: any) :Observable<any> {
        return this.httpClient.post<httpResponse>(this.base+"/register",user);
    }

    getUser() : Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+"/user",{
            headers: this.headers
        });
    }


    getUserByID(id:string) : Observable<any> {
        return this.httpClient.post<httpResponse>(this.base+"/user",{
            ids: [id]
        },{
            headers: this.headers
        });
    }
  
    updateUser(key:string, val:string) : Observable<any> {
        return this.httpClient.patch<httpResponse>(this.base+"/user",{
            key: key,
            val: val
        },{
            headers: this.headers
        });
    }

    addAddress(address:any) :Observable<any> {
        return this.httpClient.post<httpResponse>(this.base+"/address",address,
        {
            headers: this.headers
        });
    }

    getAddress() :Observable<any> {
        return this.httpClient.get<httpResponse>(this.base+"/address",
        {
            headers: this.headers
        });
    }

    updateAddress(address:any) :Observable<any> {
        return this.httpClient.put<httpResponse>(this.base+"/address",address,
        {
            headers: this.headers
        });
    }
}
  