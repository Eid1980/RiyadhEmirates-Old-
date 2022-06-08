import { UserModel } from "./user-model";

export class RequestModel {
    Id : number;
    Header : string;
    Content : string;
    SerialNumber : string;
    RequestTypeId : number;
    StatusMsgAr: string;
    RequsetStatusEn: string
    RequestTypeEn : string;
    RequestTypeAr : string;
    Attachment1 : string;
    Attachment2 : string;
    Attachment3 : string;
    Attachment4 : string;
    Attachment5 : string
    CreationDate : Date;
    User : UserModel

}
