import { Injectable } from "@angular/core"
import { CacheService } from "../services/cache/cache.service"
import { Router } from "@angular/router"

@Injectable()
export class LoggedInAuthGuard {

    constructor(private _authService: CacheService, private _router: Router) { }

    canActivate(): boolean {
        if (this._authService.isAuthenticated()) {
            switch (this._authService.getRole()) {
                case 1: this._router.navigate(['home']); break;
                case 2: this._router.navigate(['seller']); break;
                case 3: this._router.navigate(['delivery']); break;
            }
            return false
        } else {
            return true
        }
    }
}