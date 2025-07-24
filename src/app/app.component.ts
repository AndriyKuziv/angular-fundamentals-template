import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  constructor(private auth: AuthService){}

  onLogoutClick(){
    this.auth.logout().subscribe();
    window.location.reload();
  }

  isAuthorized(){
    return this.auth.isAuthorised;
  }
}
