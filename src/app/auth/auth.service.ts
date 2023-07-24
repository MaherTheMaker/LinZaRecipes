import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponse{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?:string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string='';
  firebaseWebApiKey='AIzaSyBZrTtxrYlDRiXwBJaN79JVTmaAP1-J3mI';
  firebaseSignUpAuthApiURL='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.firebaseWebApiKey;
  firebaseRealTimeStorageURL='https://linzarecipes-default-rtdb.europe-west1.firebasedatabase.app/';
  firebaseSignInAuthApiURL='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.firebaseWebApiKey;

// Create a default user object with initial values
   defaultUser = new User('', '', '', null!);

   private logOutTimer:any;

// Initialize the BehaviorSubject with the default user
   user = new BehaviorSubject<User>(this.defaultUser);


  constructor(private http:HttpClient,private router :Router) {
  }

  signUp(email:string,password:string){


    return  this.http.post<AuthResponse>(this.firebaseSignUpAuthApiURL,{
        email:email,
        password:password,
        returnSecureToken:true
      }

    ).pipe(
     catchError(this.handleError)
      ,tap(res=>{
    this.handleAuthentication(res.email,res.localId,res.idToken,+res.expiresIn);
      })
    );
  }
  autoLogin()
  {
    const usertext=localStorage.getItem('userData');
    if(!usertext)
    {
      return;
    }
    const oldUser:{
       email: string,
       id: string,
       _token: string,
       _tokenExpireDate: string
    }=JSON.parse(usertext);

    const loggedInUser=new User(oldUser.email,oldUser.id,oldUser._token,new Date(oldUser._tokenExpireDate));

    if(loggedInUser.token)
    {
      this.token=loggedInUser.token;
      this.user.next(loggedInUser);
      const expireDuration =new Date(oldUser._tokenExpireDate).getTime()-new Date().getTime();
      this.autoLogout(expireDuration);

    }
  }
logout(){
    this.user.next(this.defaultUser);
    this.router.navigate(['../Auth']);
    localStorage.removeItem('userData');
    if (this.logOutTimer)
    {
      clearTimeout(this.logOutTimer);
    }
}
  autoLogout(expDuration :number){
    this.logOutTimer= setTimeout(
      ()=>{
        this.logout()
      },expDuration

    );
  }
  singIn(email:string,password:string){
    return  this.http.post<AuthResponse>(this.firebaseSignInAuthApiURL,{
        email:email,
        password:password,
        returnSecureToken:true
      }

    ).pipe(
      catchError(this.handleError)
      ,tap(res=>{
        this.handleAuthentication(res.email,res.localId,res.idToken,+res.expiresIn);
      })
    );
  }
  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number)
  {

    const expireDate=new Date(new Date().getTime()+ +expiresIn*1000)
    const newUser=new User(email,userId,token,expireDate);
    this.token=token;
    this.user.next(newUser);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(newUser));
  }
  private handleError(errorRes:HttpErrorResponse)
  {

      let errorMsg="An error has occurred";
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMsg)
      }
      switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMsg='This email exist already try logging in !'
          break;
        case 'EMAIL_NOT_FOUND':
          errorMsg='This email not signed up !'
          break
        case 'INVALID_PASSWORD':
          errorMsg='This email not match with this password !'
          break

      }



      return throwError(errorMsg);
    }


}
