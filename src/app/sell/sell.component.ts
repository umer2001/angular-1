import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent {
  sellForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cost: new FormControl('', [Validators.required, Validators.min(1)]),
    imageUrl: new FormControl('', [Validators.required, this.urlValidator]),
    category: new FormControl('', Validators.required),
  });

  constructor(private productService: ProductService) {}

  get categories() {
    return this.productService.getCategories();
  }

  urlValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value.match(/^(http|https):\/\/.*\.(jpg|png)$/)) {
      return { invalidUrl: true };
    }
    return null;
  }

  onSubmit() {
    const { name, cost, imageUrl, category } = this.sellForm.value;
    if (!this.sellForm.valid) {
      alert('Please fill all the fields');
      return;
    }
    if (name && cost && imageUrl && category) {
      console.log({ name, cost, imageUrl, category });
      const castedCost = Number(cost);
      this.productService.addProduct({
        name,
        cost: castedCost,
        imageUrl,
        category,
      });
      this.sellForm.reset({
        name: '',
        cost: '',
        imageUrl: '',
        category: '',
      });
    }
  }
}
