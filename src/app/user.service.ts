import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(user:any):Observable<any>
  {
    let httpHeaders = new HttpHeaders({"Content-Type" : "application/json"})
    let body = JSON.stringify(user);   
    return this.http.post("https://51.145.9.114/ChatServer/api/user/login",body,{headers : httpHeaders})
    //return this.http.post(" http://localhost:54819/api/user/login",body,{headers : httpHeaders})

   
  }

  create(user:User):Observable<any>
  {
    let httpHeaders = new HttpHeaders({"Content-Type" : "application/json"})
    let body = JSON.stringify(user);
    //return this.http.post("http://localhost:54819/api/user/register",body,{headers : httpHeaders})

    return this.http.post("https://51.145.9.114/ChatServer/api/user/register",body,{headers : httpHeaders});
  }
}
