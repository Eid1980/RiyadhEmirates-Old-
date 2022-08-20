export interface GetNewsDetailsDto {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  newsTypeId: number;
  date: string;
  isActive: boolean;

  image: any;
}
