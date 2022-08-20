export interface ResponseVM {
  isSuccess: boolean;
  message: string;
  additionalInfo: string;
  data: any;
}

export interface ServiceResponseVM {
  isSuccess?: boolean;
  data?: any;
}
