import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";


@Component({
  selector: 'app-mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.css']
})
export class MockFormComponent implements OnInit {
  messageList = new Array<string>();
  messagetoSend :string = "Wole just entered the group";
  avatarDirection = "left";
  guid :string;
  constructor() { }

  ngOnInit() {
    this.guid = Guid.create().toString();
  }
  send(message){
    this.messageList.push(message);
    //console.log(event);
  }

}
