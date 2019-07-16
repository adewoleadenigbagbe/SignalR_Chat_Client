import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class MessageDetails {
    public Message : string;
    public Id : string;
    public IsSender: boolean = false;
    public SenderName : string;
    private Date: string;
    private IsJustConnected: boolean;

    constructor(id:string,message:string,issender:boolean,senderName:string,date:string,isJustConnected:boolean)
    {
        this.Id = id
        this.Message = message;
        this.IsSender = issender;
        this.SenderName = senderName;
        this.Date = date;
        this.IsJustConnected = isJustConnected
    }
}
