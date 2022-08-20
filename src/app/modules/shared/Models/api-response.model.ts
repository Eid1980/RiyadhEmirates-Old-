
export interface ApiResponse<Type> {
  (info: Type): Type;

  isSuccess: boolean;
  message: string;
  data: Type;
}
