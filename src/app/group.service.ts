import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }

  getGroupCategories():Observable<any>
  {
    //return this.http.get("http://localhost:54819/api/group")
    return this.http.get("https://51.145.9.114/ChatServer/api/group")
  }
}
