import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/Services/account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  constructor(
    private fb: FormBuilder,
    private _service: AccountService,
    private _router: Router,
    private _arouter: ActivatedRoute
  ) {}
  id: any;
  editProfile: any;
  item: any;
  existingImage: any;
  UserData = new FormData();
  imageUrl: any;
  imageEvent: any;
  ngOnInit(): void {
    this.id = this._arouter.snapshot.paramMap.get('id');
    this._service.GetUserById(this.id).subscribe((res) => {
      this.existingImage = res.image;
      this.item = res;
      this.editProfile = this.fb.group({
        Image: [this.item.Image, Validators.required],
      });
    });
  }
  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0] ?? null;
    if (file) {
      this.imageEvent = event;
    }
  }
  newImage: any;
  uniqueId: any = Math.random() * 100;
  cropImg(e: any) {
    debugger;
    this.existingImage = e.objectUrl;
    this.UserData.delete('image');
    this.UserData.append('image', e.blob, `${this.uniqueId}filename.jpg`);
  }

  imgLoad() {}

  initCropper() {}

  imgFailed() {}
  GoBack() {
    this._router.navigate(['Admin']);
  }
  UpdateImage: any;
  PreviosImage: any;
  onSubmit() {
     this._service.changeImage.next(true);
    this._service.UpdateUser(this.id, this.UserData).subscribe(
      (res) => {
        this.existingImage = res.image;
        localStorage.removeItem('Image');
        this._service.GetUserById(this.id).subscribe(
          (sol) => {
            localStorage.setItem('Image', sol.image);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
