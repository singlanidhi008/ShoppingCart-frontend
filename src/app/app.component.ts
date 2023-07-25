import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  log:any;
   tokenvalue:any
   username:any;
   image:any
   value:any;
  constructor(private _service:AccountService,private router:Router)
  {
  
    // this.image=localStorage.getItem('Image');
     this._service.logged.subscribe((res)=>
     {
         this.log=res;
          
     })
     this._service.changeImage.subscribe(res=>
      {
       this.image=localStorage.getItem('Image');
      })
      this._service.changeUsername.subscribe(res=>
        {
          this.username=localStorage.getItem('UserName');
        })

    }
  GoBack()
  {
    this._service.logged.next(false)
    this.router.navigate([''])
    localStorage.clear();
   
  }
  id=localStorage.getItem('Id')
  EditProfile(){
    this.router.navigate(['EditProfile',this.id])
  }
}
