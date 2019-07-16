import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupCategoryComponent } from './group-category/group-category.component';
import {LoginFormComponent} from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { AuthGuard } from './auth.guard';
import { MockFormComponent } from './mock-form/mock-form.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

const applicationRoutes:Routes = 
[
    {path:'',component:LoginFormComponent},
    {path:'category',component:GroupCategoryComponent},
    {path:'signup',component:SignupFormComponent},
    {path:'mock',component:MockFormComponent},
    {path:'chat',component:ChatFormComponent,canActivate:[AuthGuard]}
];


export const routing = RouterModule.forRoot(applicationRoutes);
