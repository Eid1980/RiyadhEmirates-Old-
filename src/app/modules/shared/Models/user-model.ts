export class UserModel {
  id: number;
  userName: string;

  nameAr: string;
  shortNameAr: string;
  nameEn: string;
  shortNameEn: string;

  nationalId: string;
  genderName: string;
  address: string;
  email: string;
  phoneNumber: string;

  nationalityName: string;
  governorateName: string;

  passwordHash: [];
  passwordSalt: [];
  isAdmin: boolean;
  isActive: boolean;
  oTP: string;
  birthDate: string;

}
