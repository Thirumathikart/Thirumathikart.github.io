import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  token!:string | null;
  role!:string | null;

  constructor() {
    this.token = localStorage.getItem('jwt');
    this.role = localStorage.getItem('role');
  }

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('jwt');
    return this.token !== null && this.token !== undefined;
  }

  public isAuthorized(role:number): boolean {
    this.role = localStorage.getItem('role');
    if(this.role == null || this.role == undefined) return false;
    return role === parseInt(this.role, 10);
  }

}