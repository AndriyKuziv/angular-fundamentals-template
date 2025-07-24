import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { LoginUser } from '@app/shared/models/userModels.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  
  constructor(private authService: AuthService) {}

  email: string = "";
  password: string = "";

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Form is valid!");
      const user: LoginUser = this.loginForm.value as LoginUser;
      console.log(user);
      const response = this.authService.login(user).subscribe(response => response);
      console.log(response);
    }
    else{
      console.log("Form is NOT valid!");
    }
  }
}
