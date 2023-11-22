import { Injectable } from "@angular/core"
import { CacheService } from "../services/cache/cache.service"
import { Router } from "@angular/router"

@Injectable()
export class LoggedInAuthGuard  {

    constructor(private _authService: CacheService, private _router: Router) { }

    canActivate(): boolean {
        if (this._authService.isAuthenticated()) {
            this._router.navigate(['home'])
            return false
        } else {
            return true
        }
    }
}