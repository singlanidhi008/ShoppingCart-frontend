import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/Services/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent {
  public item: any;
  public DeleteProduct: any;
  constructor(
    private fb: FormBuilder,
    private _service: ProductService,
    private _router: Router,
    private _arouter: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    let id = this._arouter.snapshot.paramMap.get('id');
    this._service.GetProductById(id).subscribe((res: any) => {
      console.log(res);
      this.item = res;
      console.log(this.item.name);
      this.DeleteProduct = this.fb.group({
        Id: [this.item.id],
        Name: [{ value: this.item.name, disabled: true }],
        Price: [{ value: this.item.price, disabled: true }],
        Description: [{ value: this.item.description, disabled: true }],
        Category: [
          { value: this.item.category, disabled: true },
          [Validators.required],
        ],
        Image: [
          { value: this.item.image, disabled: true },
          [Validators.required],
        ],
      });
    });
  }

  onSubmit(data: any) {
    console.log('hit agyi');
    this._service.DeleteProduct(data).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product Deleted Successfully',
          });
        }, 300);
        this._router.navigate(['Admin']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Back() {
    this._router.navigate(['Admin']);
  }
}
