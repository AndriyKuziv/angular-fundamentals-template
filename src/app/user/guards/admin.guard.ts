import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private readonly userStoreService: UserStoreService, private readonly router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.userStoreService.isAdmin) {
            return true;
        }

        return this.router.parseUrl("/courses");
    }
}
