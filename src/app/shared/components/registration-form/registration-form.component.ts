import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { RegisterUser } from '@app/shared/models/userModels.interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  @ViewChild("registrationForm") registrationForm!: FormGroup;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}
  
  name: string = "";
  email: string = "";
  password: string = "";

  onSubmit() {
    if (!this.registrationForm.valid) {
      return
    }

    const user: RegisterUser = this.registrationForm.value as RegisterUser;
    this.authService.register(user).subscribe(response => {
      if (response.successful){
        this.router.navigate(["/login"]);
      }
    });
  }
}
