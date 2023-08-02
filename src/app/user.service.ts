import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  static user: User | null = null;

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  login(email: string, password: string): User | boolean {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      UserService.user = user;
      return user;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return UserService.user !== null;
  }

  boughtProduct(product: Product) {
    if (UserService.user) {
      var alreadyBought = UserService.user.products.find(
        (prod) => prod.name === product.name
      );
      if (!alreadyBought) {
        UserService.user.products.push(product);
      }
    }
  }

  constructor() {}
}
