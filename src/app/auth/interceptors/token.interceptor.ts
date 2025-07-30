import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionStorageService } from '../services/session-storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private sessionStorage: SessionStorageService,
        private authService: AuthService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();
        let clonedReq = req;

        if (token) {
            clonedReq = req.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }

        console.log(clonedReq);

        return next.handle(clonedReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout().subscribe(() => {
                        this.router.navigate(['/login']);
                    });
                }
                console.log(error.message);

                return throwError(() => error);
            })
        );
    }
}
