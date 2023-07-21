import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/Services/product.service';
import { MessageService } from 'primeng/api';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  public item: any;
  public UpdateProduct: any;
  id:any
  constructor(
    private fb: FormBuilder,
    private _service: ProductService,
    private _router: Router,
    private _arouter: ActivatedRoute,
    private messageService: MessageService
  ) {}
  productData = new FormData();
  onImageChange(event: any) {
    const file = event.target.files[0] ;
    if (file) {
      this.productData.append('Image', file);
    }
    var reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onload=(e:any)=>
    {
      this.existingImageURL=e.target.result;
    }

  }
  existingImageURL:any;
  ngOnInit(): void {
    this.id = this._arouter.snapshot.paramMap.get('id');
    this._service.GetProductById(this.id).subscribe((res) => {
      console.log(res);
      this.item = res;
      this.existingImageURL = this.item.image;
      this.UpdateProduct = this.fb.group({
        Id: [this.item.id],
        Name: [this.item.name, [Validators.required]],
        Price: [this.item.price, [Validators.required]],
        Description: [this.item.description, [Validators.required]],
        Category: [this.item.category, [Validators.required]],
         Image: [this.item.image, [Validators.required]],
       
      });
    });
  }
 
  
  onSubmit() {
    console.log('hit agyi');
      this.productData.append('Name', this.UpdateProduct.value.Name as string);
      const priceValue = parseFloat(this.UpdateProduct.value.Price!);
      if (!isNaN(priceValue)) {
        this.productData.append('Price', priceValue.toString());
      }
      this.productData.append('Description',this.UpdateProduct.value.Description as string);
      this.productData.append('Category',this.UpdateProduct.value.Category as string);
     
    console.log(this.productData.get('Image'))
    this._service.UpdateProduct(this.id,this.productData).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product Edited Successfully',
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

  get name() {
    return this.UpdateProduct.controls['Name'];
  }
  get price() {
    return this.UpdateProduct.controls['Price'];
  }
  get description() {
    return this.UpdateProduct.controls['Description'];
  }
  get category() {
    return this.UpdateProduct.controls['Category'];
  }
  get image() {
    return this.UpdateProduct.controls['Image'];
  }
}
