export class UserModel {
    Id : string;
    Name : string;
    NationalId : string;
    Email : string;
    Address : string;
    PhoneNumber : string;
    BirthDate : Date;
    Role : string;
    UserName : string;
    IsAdmin : boolean;


    constructor ()
    {
        this.Id = "";
        this.Name = "";
        this.Email = "";
        this.Address = "";
        this.PhoneNumber = "";
        this.Role = "";
    }
}
