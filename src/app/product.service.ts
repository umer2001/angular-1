import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      name: 'Art 1',
      cost: 799,
      imageUrl:
        'https://images.wallpaperscraft.com/image/single/fox_cute_art_149937_1280x720.jpg',
      category: 'Electronics',
    },
    {
      name: 'Art 2',
      cost: 699,
      imageUrl:
        'https://images.wallpaperscraft.com/image/single/fox_cute_art_149937_1280x720.jpg',
      category: 'Grocery',
    },
    {
      name: 'Art 3',
      cost: 299,
      imageUrl:
        'https://images.wallpaperscraft.com/image/single/fox_cute_art_149937_1280x720.jpg',
      category: 'Fashion',
    },
    {
      name: 'Art 4',
      cost: 299,
      imageUrl:
        'https://images.wallpaperscraft.com/image/single/fox_cute_art_149937_1280x720.jpg',
      category: 'Fashion',
    },
  ];
  private categories: string[] = ['Electronics', 'Grocery', 'Fashion'];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  removeProduct(productName: string) {
    this.products = this.products.filter(
      (product) => product.name !== productName
    );
  }

  getCategories(): string[] {
    return this.categories;
  }
}
