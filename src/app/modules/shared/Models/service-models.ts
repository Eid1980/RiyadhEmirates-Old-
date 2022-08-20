export interface GetServiceListDto {
  id: number;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  requestLink: string;
  workDays?: number;
  isActive: boolean;
  createdDate: string;
  image: any;
}

export interface GetServiceDetailsDto {
  id: number;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  requestLink: string;
  workDays?: number;
  isActive: boolean;
  image: any;
}
