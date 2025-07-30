import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  isAuthorized$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router){
    this.isAuthorized$ = this.auth.isAuthorized$;
  }

  onLogoutClick(){
    this.auth.logout().subscribe(response => {
      window.location.reload();
    });
  }

  onLoginClick(){
    this.router.navigate(['/login']);
  }
}
