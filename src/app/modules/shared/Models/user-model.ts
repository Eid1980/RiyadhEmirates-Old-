export class UserModel {
    Id : string;
    Name : string;
    NationalId : string;
    Email : string;
    Address : string;
    PhoneNumber : string;
    BirthDate : Date;
    Role : string;


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
