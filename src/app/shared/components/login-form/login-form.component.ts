import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { LoginUser } from '@app/shared/models/userModels.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  email: string = "";
  password: string = "";

  onSubmit(): void {
    if (!this.loginForm.valid) {
      console.error("Login form is not valid!");
      return;
    }

    const user: LoginUser = this.loginForm.value as LoginUser;
    this.authService.login(user).subscribe(response => {
      if (response.successful){
        this.router.navigate(["/"]);
      }
    });
  }
}
