import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private readonly userStoreService: UserStoreService, private readonly router: Router) {}
    
    canActivate(): boolean | UrlTree {
        if (this.userStoreService.isAdmin) {
            return true;
        }

        this.router.parseUrl('/courses');

        return false;
    }
}
