import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {FormGroup,FormControl,FormBuilder,Validators,AbstractControl,} from '@angular/forms';
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
      Image:['',Validators.required],
      Password: ['', [Validators.required, this.customPasswordValidator]],
      ConfirmPassword: ['', [Validators.required]],
    },
    { validator: passwordValidator }
  );
    userData=new FormData();
    imageUrl:any;
    imageEvent:any
    onImageChange(event: Event) {
      const file = (event.target as HTMLInputElement)?.files?.[0] ?? null;
      if (file) {
        this.imageEvent=event
      }
    }
    cropImgPreview:any
  uniqueId:any=Math.random()*100;
  cropImg(e: any) {
    console.log(e);
    this.cropImgPreview = e.objectUrl;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        const dataURL = event.target.result as string;
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
  
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
      const blob = new Blob([arrayBuffer], { type: mimeString });
         this.userData.delete('image');
        this.userData.append('image', blob, `${this.uniqueId}filename.jpg`);
      } 
    };
  
    // Read the Blob as a data URL
    reader.readAsDataURL(e.blob);
  }
  
  
  imgLoad() {
    // display cropper tool
     }

initCropper() {
    // init cropper
          }

imgFailed() {
    // error msg
}
  onSubmit() {
    console.log('hit agyi');
      this.userData.append('Username',this.UserObj.value.Username);
      console.log(this.UserObj.value.Username);
      this.userData.append('Email',this.UserObj.value.Email);
      this.userData.append('Password',this.UserObj.value.Password);
      this.userData.append('ConfirmPassword',this.UserObj.value.ConfirmPassword);
    this._service.userSignUp(this.userData).subscribe(
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
  get image() {
    return this.UserObj.controls['Image'];
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
