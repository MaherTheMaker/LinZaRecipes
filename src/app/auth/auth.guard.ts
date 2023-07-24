import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {map, Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService,private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return  this.authService.user.pipe(map(
      user=>{
        const isAuth=!!user.token;
        if (isAuth)
        {
          return true;
        }
        return  this.router.createUrlTree(['/Auth']);
      }
    ))


  }
}
