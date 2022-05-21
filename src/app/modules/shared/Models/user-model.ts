export class UserModel {
    Id : string;
    displayName : string;
    email : string;
    address : string;
    phoneNumber : string;
    token : string;

    constructor ()
    {
        this.Id = "";
        this.displayName = "";
        this.email = "";
        this.address = "";
        this.phoneNumber = "";
        this.token = "";
    }
}
