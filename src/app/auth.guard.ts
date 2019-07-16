import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
constructor(private router:Router,private cookieService:CookieService){
 
}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    let boolval = this.checkCookiesInfo();
    return boolval;
  }

  checkCookiesInfo():boolean
  {
    if(this.cookieService.check("UserName") && this.cookieService.check("Category"))
    {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
