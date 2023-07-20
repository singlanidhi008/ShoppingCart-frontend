import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/Services/product.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent {
  public item: any;
  public ShownProduct: any;
  showModal: boolean | undefined;
  constructor(
    private fb: FormBuilder,
    private _service: ProductService,
    private _router: Router,
    private _arouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this._arouter.snapshot.paramMap.get('id');
    this._service.GetProductById(id).subscribe((res: any) => {
      console.log(res);
      this.item = res;
      this.ShownProduct = this.fb.group({
        Id: [this.item.id],
        Name: [
          { value: this.item.name, disabled: true },
          [Validators.required],
        ],
        Price: [
          { value: this.item.price, disabled: true },
          [Validators.required],
        ],
        Description: [
          { value: this.item.description, disabled: true },
          [Validators.required],
        ],
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
    this._service.GetProductById(data).subscribe(
      () => {
        alert('Product Shown Successfully');
        this._router.navigate(['Admin']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  Back() {
    this._router.navigate(['Admin']);
  }
}
