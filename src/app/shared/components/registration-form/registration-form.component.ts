import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  @ViewChild("registrationForm") registrationForm!: FormGroup;
  
  name: string = "";
  email: string = "";
  password: string = "";

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log("Form is valid!");
    }
    else{
      console.log("Form is NOT valid!");
    }
  }
}
