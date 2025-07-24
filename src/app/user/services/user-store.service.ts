import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import { User } from '@app/shared/models/userModels.interface';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string | null>(null);
    public name$: Observable<string | null> = this.name$$.asObservable();

    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private readonly userService: UserService) {}

    getUser() {
        return this.userService.getUser().pipe(
            tap((user: User | null) => {
                if (user) {
                    this.name$$.next(user.name);
                    this.isAdmin$$.next(user.role === "admin");
                } else {
                    this.name$$.next(null);
                    this.isAdmin$$.next(false);
                }
            })
        );
    }

    get isAdmin() {
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
