import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBase } from '@app/shared/models/responseBase.interface';
import { User } from '@app/shared/models/userModels.interface';
import * as apiConstants from '@app/shared/constants/api.constants';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private readonly http: HttpClient) {}

    getUser() {
        return this.http.get<ResponseBase>(apiConstants.baseUrl + apiConstants.userEndpointBase
            + apiConstants.userCurrentEndpoint)
        .pipe(
            map(response => {
                console.log(response);
                
                if(!response.successful || typeof(response.result as User) === "undefined"){
                    return null;
                }
                
                return response.result as User;
            })
        );
    }
}
