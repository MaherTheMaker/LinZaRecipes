import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponse, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
   @ViewChild('f',{static:true}) authForm!:NgForm;
  signInMode:boolean=false;
  isLoading:boolean=false;
  error:string="";


  constructor(private authService:AuthService,private router:Router) {
  }
  SwitchMode() {
    this.signInMode=!this.signInMode;
  }

  protected readonly onsubmit = onsubmit;

  onSubmit(f: NgForm) {
  this.error="";
    this.isLoading=true;
    if (!f.valid)
    {
      return;
    }

    const email =f.value.email;
    const password =f.value.password;

    let authObs:Observable<AuthResponse>;
    if(!this.signInMode)
    {
      authObs=this.authService.signUp(email,password);

    }
    else {
    authObs=  this.authService.singIn(email,password);

    }
    authObs.subscribe(
      res=> {
        // this.handleAuthenticatedUser(res)
        this.isLoading=false;
        this.router.navigate(['./Recipes'])
      }
      , errorMsg => {
        this.error = errorMsg;
        this.isLoading=false;
      }
    );


    this.authForm.reset();

  }




}
