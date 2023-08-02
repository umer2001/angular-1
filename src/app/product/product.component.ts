import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() name?: string;
  @Input() cost?: number;
  @Input() imageUrl?: string;
  @Input() category?: string;
  @ViewChild('buyModal', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  @Output() buyEvent = new EventEmitter<Product>();

  ngOnDestroy(): void {
    this.closeModal();
  }

  openModal() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }

  closeModal() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  buy() {
    this.buyEvent.emit?.({
      name: this.name!,
      cost: this.cost!,
      imageUrl: this.imageUrl!,
      category: this.category!,
    });
    this.closeModal();
  }
}
