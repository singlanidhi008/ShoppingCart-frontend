import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AsyncSubject } from 'rxjs';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'User',component:UserComponent},
  {path:'AddProducts',component:AddProductComponent,canActivate:[AuthGuard]},
  {path:'EditProduct/:id',component:EditProductComponent,canActivate:[AuthGuard]},
  {path:'DeleteProduct/:id',component:DeleteProductComponent,canActivate:[AuthGuard]},
  {path:'ShowDetails/:id',component:ShowDetailsComponent,canActivate:[AuthGuard]},
  {path:'EditProfile/:id',component:EditProfileComponent,canActivate:[AuthGuard]},
  {path:'AccessDenied',component:AccessDeniedComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent, AdminComponent,UserComponent,AddProductComponent,EditProductComponent,DeleteProductComponent,ShowDetailsComponent,AccessDeniedComponent,EditProfileComponent]
