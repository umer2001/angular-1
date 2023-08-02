import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent {
  search = new FormControl('');
  category = new FormControl('');
  products: Product[];

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {
    this.products = this.productService.getProducts();
  }

  get categories() {
    return this.productService.getCategories();
  }

  buy(product: Product): void {
    this.productService.removeProduct(product.name);
    this.userService.boughtProduct(product);
    // refresh products
    this.products = this.productService.getProducts();
    this.searchProducts();
  }

  searchProducts() {
    const { value: search } = this.search;
    const { value: category } = this.category;
    this.products = this.productService.getProducts();
    if (category) {
      this.products = this.products.filter((p) => p.category === category);
    }
    if (search) {
      this.products = this.products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }
}
