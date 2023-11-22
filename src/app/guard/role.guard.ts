import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CacheService } from '../services/cache/cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard {

  constructor(public auth: CacheService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const role  = parseInt(route.data['role'], 10);
    console.log("guard:"+ role);
    if (!this.auth.isAuthenticated()) {
        this.router.navigate(['auth']);
        return false;
    }
    else if (!this.auth.isAuthorized(role)) {
        this.router.navigate(['**']);
        return false;
    }
    return true;
  }
}