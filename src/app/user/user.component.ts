import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AccountService } from 'src/Services/account.service';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/Password.Validator';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(
    private fb: FormBuilder,
    private _service: AccountService,
    private _router: Router,
    private messageservice:MessageService
  ) {}

  UserObj = this.fb.group(
    {
      Username: ['', [Validators.required]],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      Password: ['', [Validators.required, this.customPasswordValidator]],
      ConfirmPassword: ['', [Validators.required]],
    },
    { validator: passwordValidator }
  );

  onSubmit(data: any) {
    console.log('hit agyi');
    4;
    this._service.userSignUp(data).subscribe(
      (res) => {
        setTimeout(() => {
          this.messageservice.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Register Successfully',
          });
        }, 300);
        console.log(res);
        // alert('User Created Successfully');
        this._router.navigate(['']);
      },
      (err) => {
        console.log(err);
        if (err === 409) alert('User Already Exists');
      }
    );
  }

  GoToLogin() {
    this._router.navigate(['']);
  }
  get name() {
    return this.UserObj.controls['Username'];
  }
  get email() {
    return this.UserObj.controls['Email'];
  }
  get password() {
    return this.UserObj.controls['Password'];
  }
  customPasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;

    if (!/^[A-Z]/.test(password)) {
      return { invalidStartChar: true };
    }
    if (!/[1-9]/.test(password)) {
      return { noNumber: true };
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      return { noSpecialSymbol: true };
    }

    return null;
  }
}
