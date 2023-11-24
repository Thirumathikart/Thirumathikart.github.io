import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return token !== null;
  }

  public isAuthorized(role:number): boolean {
    if(this.getRole() != this.getStoredRole()) return false;
    return role === this.getRole();
  }

  public getStoredRole(): number {
    const role = localStorage.getItem('role');
    if(role==null) return 0;
    return parseInt(role)
  }

  public getFCM() : string | null {
    return localStorage.getItem('fcm');
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
    return 2;
  }

}