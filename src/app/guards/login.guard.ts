import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoginGuard implements CanActivate {
  
  constructor(private loginService : LoginService,
              private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      if(this.loginService.isAuthenticated()){
        resolve(true);
      }else{
        this.router.navigateByUrl("/login");
        resolve(false);
      }
    })
  }  
}
