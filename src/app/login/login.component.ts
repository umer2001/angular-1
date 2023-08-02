import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, this.emailValidator]),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  // email validator function
  emailValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      if (this.userService.login(email, password)) {
        this.router.navigate(['/home']);
      } else {
        alert('Invalid username or password');
      }
    }
  }
}
