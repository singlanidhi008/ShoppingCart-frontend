import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,Routes} from '@angular/router';
import { AccountService } from 'src/Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   
  constructor(private _service: AccountService, private _router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this._service.GetUserRole();
  
    if (userRole=="User" && (route.url[0].path === 'EditProduct' || route.url[0].path === 'DeleteProduct' ||route.url[0].path === 'AddProducts' )) {
      this._router.navigate(['AccessDenied']);
      return false;
    }
  
    if (this._service.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['']);
      return false;
    }
  }
  

}
