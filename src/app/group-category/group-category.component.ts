import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {map} from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service';

import {GroupService} from './../group.service';

@Component({
  selector: 'app-group-category',
  templateUrl: './group-category.component.html',
  styleUrls: ['./group-category.component.css']
})
export class GroupCategoryComponent implements OnInit {

  username:string;
  groupcategories: Array<string> = new Array<string>();
  constructor(public activatedRoute: ActivatedRoute,private router:Router
    ,private groupService:GroupService,private cookieService:CookieService) { }

  ngOnInit() {
    this.groupService.getGroupCategories().subscribe(res => {
      if(res["responseCode"] === "00")
      {
        this.groupcategories = res["list"];
        console.log(this.groupcategories);
      }
    })
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state)).subscribe(d => 
        {
          this.username = d.username;
          console.log(this.username);
        });
        
  }

  gotoChat(category:string):void{
    this.cookieService.set("Category",category,new Date().setHours(2));

    console.log("This is the username : "+this.username);
    this.router.navigate(["chat"]);
  }
}
