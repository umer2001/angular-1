import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  get user(): { name: string; email: string; dob: string; products: string } {
    if (!UserService.user) {
      return {
        name: '',
        email: '',
        dob: '',
        products: '',
      };
    }
    return {
      ...UserService.user!,
      products: UserService.user!.products.map((p) => p.name).join(', '),
    };
  }
}
