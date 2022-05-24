import { UserModel } from "./user-model";

export class RequestModel {
    id : number;
    header : string;
    content : string;
    SerialNumber : string;
    statusMsgAr: string;
    requsetStatusEn: string
    requestTypeEn : string;
    requestTypeAr : string; 
    attachment1 : string;
    attachment2 : string;
    attachment3 : string;
    attachment4 : string;
    attachment5 : string
    creationDate : Date;
    user : UserModel

}
