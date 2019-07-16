import { Component, OnInit } from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState} from '@aspnet/signalr'
import {Router,RouterLink} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'ChatClient';
  private _hubConnection : HubConnection;
  private messageList = new Array<string>();
  private messagetoSend :string = "Hi there";
  private name : string;
  private whoisTyping : string = "...";

  constructor(private router:Router)
  {

  }
  public goToCategories():void
  {
     this.router.navigate(['login']);
  }


}
