import { Component, OnInit} from '@angular/core';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr'
import {MessageDetails} from 'src/app/message-details'

import { Guid } from "guid-typescript";

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  title = 'ChatClient';
  _hubConnection : HubConnection;
  messageDetails = Array<MessageDetails>();
  messagetoSend :string = "Hi there";
  sessionUserName : string = "";
  groupName: string = "";
  whoisTyping : string = "Chat";
  connectionId :string = "";
 
  constructor(private cookieService:CookieService) {
       
   }

  ngOnInit()
  {
    var boouser = this.cookieService.check("UserName");
    var booCategory = this.cookieService.check("Category");

      console.log("UserName stored state : " + boouser);
      console.log("Category stored state : " +booCategory)

    this.sessionUserName = this.cookieService.get("UserName");
    this.groupName = this.cookieService.get("Category");



    this._hubConnection = new HubConnectionBuilder()
    //.withUrl(`http://localhost:54819/chathub?username=${this.sessionUserName}&group=${this.groupName}`)
    .withUrl(`https://51.145.9.114/ChatServer/chatHub?username=${this.sessionUserName}&group=${this.groupName}`)
    .configureLogging(LogLevel.Debug)
    .build();
    
    this._hubConnection.start()
    .then(function(){
      console.log("CONNECTED TO CHAT SERVER !!");
    }).catch(function(err){
      console.error(err.toString());
    })

    
    this.receive();
    this.onTyping();
    this.onConnectedAlert();
 
  }

  send():void
  {
    if(this.messagetoSend === "" || this.messagetoSend === undefined)
    return;

    this.getConnectId();
    console.log(this.messagetoSend);
    console.log("Hello let us know you "+ this.sessionUserName);
    console.log("Group Name" + this.groupName);
    this._hubConnection.invoke("Broadcast", this.messagetoSend,this.sessionUserName)
    .catch(err => console.error(err.toString()));
  }

  private receive():void
  {
    
    this._hubConnection.on("OnSendtoClient", (senderName,date,message,connectionId)=> {
      console.log("Sender ConnectionId : "+connectionId);
      console.log("SenderName : "+senderName);
      console.log("Date : "+date);
      console.log("Message : "+message);

     
      let issender = false;
      if(this.connectionId === connectionId)
      {
        issender = true;
      }
      var details = new MessageDetails(
        Guid.create().toString(),
        message,
        issender,
        senderName.substring(0, 2),
        date,
        false);

      this.messageDetails.push(details);
      this.messagetoSend = '';
      this.whoisTyping = "Chat";

    });
  }

  onTyping() {
    this._hubConnection.on("GetWhoTypes", (name)=> {
      this.whoisTyping = name;
    }); 
    
  }

  whoisTyingNow():void
  {
    this.whoisTyping = `${this.groupName} Chat`;
    this._hubConnection.invoke("OnTyping",  `${this.sessionUserName} is typing`)
    .catch(err => console.error(err.toString()));
  }

  trackElement(index: number, element: any) {
    return element.Id ;
  }

  getConnectId():void
  {
    this._hubConnection.invoke("GetConnectionId")
    .then((connectionID) => {
      this.connectionId = connectionID;
      console.log("fdhjhdfhfh"+this.connectionId);
    })
    .catch(err => console.error(err.toString()));
  }

  onConnectedAlert():void{
    this._hubConnection.on("ConnectedAlert",(message,userName,date) => {

      var details = new MessageDetails(
        Guid.create().toString(),
        message,
        false,
        "Anon",
        date,
        true);

      this.messageDetails.push(details);
      console.log(message);
    })
  }

}
