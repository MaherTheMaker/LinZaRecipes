import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authSer: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.authSer.token || !req.url.includes(this.authSer.firebaseRealTimeStorageURL)){

      next.handle(req);
    }

    const modifiedReq = req.clone({
      params: new HttpParams().set('auth', this.authSer.token)
    });
    return next.handle(modifiedReq);

    // return this.authSer.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //
    //
    //     if(!user)
    //     {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone
    //     ({
    //       params: new HttpParams().set(('auth'), user.token!)
    //     });
    //     return next.handle(modifiedReq);
    //
    //   })
    // );
  }

}
