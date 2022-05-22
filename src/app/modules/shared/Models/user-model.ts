export class UserModel {
    Id : string;
    displayName : string;
    email : string;
    address : string;
    phoneNumber : string;
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
