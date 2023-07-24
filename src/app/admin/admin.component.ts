import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { AccountService } from 'src/Services/account.service';
import { ProductService } from 'src/Services/product.service';
import { PaginatorModule } from 'primeng/paginator';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { __values } from 'tslib';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  products: any[] = [];
  allproducts: number = 0;
  
  filteredProducts: any[] = [];
  role: any;
  pageSize:any=5;
  searchString:any="";
  pageNumber:any=1;
  orderBy='name';
  itemsPerPageOptions=[5,10,15]
  loadingData: boolean = true;
  users:any;
  username:any;
  image:any;

  constructor(
    private _service: ProductService,
    private _router: Router,
    private account: AccountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
     this.username=localStorage.getItem('UserName');
     console.log("UserName:",this.username);
     this.image=localStorage.getItem('Image');
     console.log(this.image);
    this.role = localStorage.getItem('role');
    this.userId=localStorage.getItem('Id');
    this.loadProducts();

  }
  userId:any
  totalRecords:any
  loadProducts() {
    this.loadingData = true;
    this._service.AllProducts(this.searchString,this.pageSize,this.pageNumber,this.orderBy).subscribe(
      (res) => {
        console.log(res);
        this.products = res.items;
         this.totalRecords=res.Count;
        console.log('Products', this.allproducts);
        this.filteredProducts = [...this.products];
        console.log('filterd Products', this.filteredProducts);
        this.loadingData = false;
      },
      (err) => {
        console.error(err);
        this.loadingData = false;
      }
    );
  }
  EditProfile()
  {
    this._router.navigate(['EditProfile',this.userId])

  }
  


  existingImageURL:any;
  result:any;
  totalNumber:any
  totalPages:any
  Searching(value: any,size:any) {
    this.searchString = value; 
      this._service.AllProducts(this.searchString, size, this.pageNumber, this.orderBy).subscribe(
      (res) => {
        this.result = res.items;
        console.log("searching", this.result);
        this.totalNumber = this.result.Count;
        this.totalPages = Math.ceil(this.totalNumber / this.pageSize);
         this.products = this.result;
        this.filteredProducts=this.products;
      },
      (err)=>
      {
        console.log(err);
      }
    );
  }
  

  LogOut() {
    this._router.navigate(['']);
    localStorage.clear();
  }
  AddProduct() {
    this._router.navigate(['AddProducts']);
  }
  EditProduct(value: any) {
    this._router.navigate(['EditProduct', value.id]);
  }
  Details(value: any) {
    this._router.navigate(['ShowDetails', value.id]);
  }
  DeleteProduct(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._service.DeleteProduct(data).subscribe(
          () => {
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product Deleted Successfully',
              });
              location.reload(); 
            }, 300);
            this.filteredProducts = this.filteredProducts.filter(
              (product) => product.id !== data.id
            );
          },
          (err) => {
            console.log(err);
          }
        );
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
 

  prev() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      this._service.AllProducts(this.searchString,this.pageSize, this.pageNumber,this.orderBy).subscribe(
        (res) => {
          this.products = res.items;
          this.filteredProducts = this.products;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  next() {
    this.pageNumber = this.pageNumber + 1;
    this._service.AllProducts(this.searchString,this.pageSize, this.pageNumber,this.orderBy).subscribe(
      (res) => {
        this.products = res.items;
        this.filteredProducts = this.products;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onItemsPerPageChange() {
    this.pageNumber = 1;
    this.loadProducts();
  }
    orderbyname:any;
  SortByName()
  {
    this.orderbyname=this.orderbyname=='name'?'name_desc':'name'
    this.orderBy=this.orderbyname;
    this._service.AllProducts(this.searchString,this.pageSize,this.pageNumber,this.orderBy).subscribe(
      (res)=>
      {
        console.log("helloooooooo");
        console.log(res);
        this.products=res.items;
        this.filteredProducts=this.products;
      },
      (err)=>
      {
        console.log(err);
      }
    )
  }
  orderbyprice:any;
  SortByPrice()
  {
    this.orderbyprice=this.orderbyprice=='price_asc'?'price_desc':'price_asc'
    this.orderBy=this.orderbyprice;
    this._service.AllProducts(this.searchString,this.pageSize,this.pageNumber,this.orderBy).subscribe(
      (res)=>
      {
        console.log("helloooooooo");
        console.log(res);
        this.products=res.items;
        this.filteredProducts=this.products;
      },
      (err)=>
      {
        console.log(err);
      }
    )
  }
  orderbydescription:any;
  SortByDescription()
  {
    this.orderbydescription=this.orderbydescription=='description_asc'?'description_desc':'description_asc'
    this.orderBy=this.orderbydescription;
    this._service.AllProducts(this.searchString,this.pageSize,this.pageNumber,this.orderBy).subscribe(
      (res)=>
      {
        console.log("helloooooooo");
        console.log(res);
        this.products=res.items;
        this.filteredProducts=this.products;
      },
      (err)=>
      {
        console.log(err);
      }
    )
  }
  orderbycategory:any;
  SortByCategory()
  {
    this.orderbycategory=this.orderbycategory=='category_asc'?'category_desc':'category_asc'
    this.orderBy=this.orderbycategory;
    this._service.AllProducts(this.searchString,this.pageSize,this.pageNumber,this.orderBy).subscribe(
      (res)=>
      {
        
        console.log("helloooooooo");
        console.log(res);
        this.products=res.items;
        this.filteredProducts=this.products;
      },
      (err)=>
      {
        console.log(err);
      }
    )
  }
 
  customSort(event: SortEvent) {
    const field = event.field;
    const order = event.order ?? 1;

    if (field) {
      this.products.sort((item1, item2) => {
        const value1 = item1[field];
        const value2 = item2[field];

        if (value1 == null && value2 != null) return -1;
        if (value1 != null && value2 == null) return 1;
        if (value1 == null && value2 == null) return 0;

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return order * value1.localeCompare(value2);
        }

        return order * (value1 < value2 ? -1 : value1 > value2 ? 1 : 0);
      });
    }
  }
}
