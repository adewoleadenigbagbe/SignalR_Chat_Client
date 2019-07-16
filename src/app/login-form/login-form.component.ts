import { Component, OnInit } from '@angular/core';
import {UserService} from './../user.service' 
import { FormBuilder,FormControlName ,FormGroup,Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginFormGroup : FormGroup ;
  errorMessage : string = '';
  constructor(private userService :UserService,
    private formBuilder :FormBuilder,
    private router:Router,private cookieService:CookieService) { 
    this.loginFormGroup = this.formBuilder.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  login(){
    this.userService.getUser(this.loginFormGroup.value)
    .subscribe(resp => {
      if(resp["responseCode"] === "00")
      {
        this.cookieService.set("UserName",resp["userName"],new Date().setHours(2));
        this.router.navigate(["category"]);
      }
      this.errorMessage = resp["responseMessage"]
    })

  }

  navigateToSignupPage(){
    this.router.navigate(["signup"])
  }
}
