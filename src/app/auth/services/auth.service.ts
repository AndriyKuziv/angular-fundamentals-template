import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as apiConstants from '../../shared/constants/api.constants';
import { ResponseBase } from '@app/shared/models/responseBase.interface';
import { LoginUser, RegisterUser } from '@app/shared/models/userModels.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    private userName = new BehaviorSubject<string>("");

    constructor(
        private readonly http: HttpClient,
        private readonly sessionStorage: SessionStorageService
    ) {}

    login(user: LoginUser) {
        return this.http.post<ResponseBase>(apiConstants.baseUrl + apiConstants.loginEndpoint, user)
        .pipe(
            tap(response => {
                if(typeof(response.result) === "string"){
                    console.log("Login response: ", response);
                    this.sessionStorage.setToken(response.result);
                    this.isAuthorized$$.next(true);
                }
            })
        );
    }

    logout() {
        return this.http.delete(apiConstants.baseUrl + apiConstants.logoutEndpoint + "/" + this.sessionStorage.getToken()?.replace("Bearer ", ""))
        .pipe(
            tap(response => {
                console.log("Logout response: ", response);
                this.sessionStorage.deleteToken();
                this.isAuthorized$$.next(false);
            })
        );
    }

    register(user: RegisterUser) {
        return this.http.post(apiConstants.baseUrl + apiConstants.registerEndpoint, user)
        .pipe(
            tap(response => {
                console.log("Register response: ",response);
            })
        );
    }

    get isAuthorised() {
        // const token = this.sessionStorage.getToken();
        // return token !== null && token !== undefined && token !== "";
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return apiConstants.baseUrl + apiConstants.loginEndpoint;
    }
}
