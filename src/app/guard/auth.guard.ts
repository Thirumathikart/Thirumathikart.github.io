import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CacheService } from '../services/cache/cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard {

  constructor(public auth: CacheService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const role = route.data['role'];
    console.log(role);
    if (!this.auth.isAuthenticated()) {
        this.router.navigate(['auth']);
        return false;
    }
    return true;
  }
}