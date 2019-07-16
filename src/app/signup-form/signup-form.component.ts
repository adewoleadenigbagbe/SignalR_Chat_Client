import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import {UserService} from './../user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent  {
  errorMessage : string ;
  signUpFormGroup : FormGroup
  constructor(private userService :UserService,private formBuilder :FormBuilder,private router:Router) { 
    this.signUpFormGroup = this.formBuilder.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  register(){
    this.userService.create(this.signUpFormGroup.value)
    .subscribe(resp => {
      console.log(resp);
      if(resp["responseCode"] === "00")
      {
        this.router.navigate(['category'],{state: {username : resp["userName"]}});
      }
      this.errorMessage = resp["responseMessage"];
    })
  }

}
