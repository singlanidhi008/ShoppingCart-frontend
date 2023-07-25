import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {FormGroup,FormControl,FormBuilder,Validators,} from '@angular/forms';
import { AccountService } from 'src/Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  messageService: any;
  username:any;
  image:any;

  constructor(
    private fb: FormBuilder,
    private _service: AccountService,
    private _router: Router,
    private _messageService:MessageService
  ) {
    
  }

  loginObj = this.fb.group({
    Username: ['', [Validators.required]],
    Password: ['', [Validators.required]],
  });

  GoToSignUp() {
    this._router.navigate(['User']);
  }
  onSubmit(data: any) {
    this._service.userExist(data).subscribe((res) => {
      console.log(res);
      this._service.storeToken(res.token);
      localStorage.setItem('role', res.role);
      this._service.storeUserName(res.username);
      this._service.storeImage(res.image);
      this._service.changeImage.next(res.image)
      this._service.storeId(res.id);
      this._router.navigate(['Admin']);
    },(err)=>
    {
      console.log(err);
        this._messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Enter the valid Credentials',
        });
        location.reload(); 
    }
    );
    console.log(this.loginObj.value);
  }
  get name() {
    return this.loginObj.controls['Username'];
  }
  get password() {
    return this.loginObj.controls['Password'];
  }
  getToken() {
    localStorage.getItem('token');
  }
}
