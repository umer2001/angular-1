import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, this.emailValidator]),
    dob: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {}

  // email validator function
  emailValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSubmit() {
    const { name, email, dob, password } = this.signupForm.value;
    if (!this.signupForm.valid) {
      alert('Please fill all the fields');
      return;
    }
    if (email && name && dob && password) {
      this.userService.addUser({ name, email, dob, password, products: [] });
      this.router.navigate(['/login']);
    }
  }
}
