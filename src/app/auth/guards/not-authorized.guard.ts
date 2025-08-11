import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (!this.authService.isAuthorised) {
            return true;
        }

        return this.router.parseUrl("/courses");
    }
}
