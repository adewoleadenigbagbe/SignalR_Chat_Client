import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule,routing} from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupCategoryComponent } from './group-category/group-category.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

import { CookieService } from 'ngx-cookie-service';
import { MockFormComponent } from './mock-form/mock-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GroupCategoryComponent,
    LoginFormComponent,
    ChatFormComponent,
    SignupFormComponent,
    MockFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    CommonModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
