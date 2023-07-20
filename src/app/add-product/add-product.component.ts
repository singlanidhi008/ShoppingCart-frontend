import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  constructor(
    private fb: FormBuilder,
    private _service: ProductService,
    private _router: Router,
    private messageservice: MessageService
  ) {}

  AddProduct = this.fb.group({
    Name: ['', [Validators.required]],
    Price: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    Category: ['', [Validators.required]],

    Image: ['', [Validators.required]],
  });
  imageUrl:any;
  productData = new FormData();
  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0] ?? null;
    if (file) {
      this.productData.append('Image', file);
      const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(file)
    }
  }
  onSubmit() {
   if (this.AddProduct.valid) {
      this.productData.append('Name', this.AddProduct.value.Name as string);
      const priceValue = parseFloat(this.AddProduct.value.Price!);
      if (!isNaN(priceValue)) {
        this.productData.append('Price', priceValue.toString());
      }
      this.productData.append('Description',this.AddProduct.value.Description as string);
      this.productData.append('Category',this.AddProduct.value.Category as string);
      this._service.AddProduct(this.productData).subscribe(
        (res) => {
          console.log(res);
          setTimeout(() => {
            this.messageservice.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product Added Successfully',
            });
          }, 300);
          this._router.navigate(['Admin']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  Back() {
    this._router.navigate(['Admin']);
  }

  get name() {
    return this.AddProduct.controls['Name'];
  }
  get price() {
    return this.AddProduct.controls['Price'];
  }
  get description() {
    return this.AddProduct.controls['Description'];
  }
  get category() {
    return this.AddProduct.controls['Category'];
  }
  get image() {
    return this.AddProduct.controls['Image'];
  }
}
