import {Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  setToken(token: string){
    window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    return window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    window.sessionStorage.removeItem(TOKEN);
  }
}
