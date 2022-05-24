export class UserModel {
    Id : string;
    displayName : string;
    nationalId : string;
    email : string;
    address : string;
    phoneNumber : string;
    birthDate : Date;
    role : string;
    token : string;

    constructor ()
    {
        this.Id = "";
        this.displayName = "";
        this.email = "";
        this.address = "";
        this.phoneNumber = "";
        this.token = "";
        this.role = "";
    }
}
