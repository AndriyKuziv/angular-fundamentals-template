import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from './user/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  isAuthorized$: Observable<boolean>;
  userName$: Observable<string | null>;

  constructor(
    private readonly auth: AuthService,
    private readonly userStore: UserStoreService,
    private readonly router: Router){
    this.isAuthorized$ = this.auth.isAuthorized$;
    this.userName$ = this.userStore.name$;
  }

  ngOnInit(): void {
    this.userStore.getUser().subscribe();
  }

  onLogoutClick(){
    this.auth.logout().subscribe(response => {
      window.location.reload();
    });
  }

  onLoginClick(){
    this.router.navigate(["/login"]);
  }
}
