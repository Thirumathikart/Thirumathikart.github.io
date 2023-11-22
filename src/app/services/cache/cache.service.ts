import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return token !== null && token !== undefined;
  }

  public isAuthorized(role:number): boolean {
    return role === this.getRole();
  }

  public getRole(): number {
    var role = 0;
    if(document.referrer.includes('android-app://dev.tkart.buyer')){
        role = 1;
    }else if(document.referrer.includes('android-app://dev.tkart.seller')){
        role = 2;
    }else if(document.referrer.includes('android-app://dev.tkart.carrier')){
        role = 3;
    }
    return role;
  }

}