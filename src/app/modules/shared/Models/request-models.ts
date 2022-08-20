
export interface CreateRequestTypeDto {
  nameAr: string;
  nameEn: string;
  serviceId: number;
  isActive: boolean;
}

export interface UpdateRequestTypeDto {
  id: number;
  nameAr: string;
  nameEn: string;
  serviceId: number;
  isActive: boolean;
}

export interface GetRequestTypeDetailsDto {
  id: number;
  nameAr: string;
  nameEn: string;
  serviceId: number;
  serviceName: string;
  isActive: boolean;
}

export interface GetRequestTypeListDto {
  id: number;
  nameAr: string;
  nameEn: string;
  serviceId: number;
  serviceName: string;
  isActive: boolean;
}
