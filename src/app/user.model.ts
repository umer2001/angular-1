import { Product } from './product.model';

export interface User {
  name: string;
  email: string;
  dob: string;
  password: string;
  products: Product[];
}
