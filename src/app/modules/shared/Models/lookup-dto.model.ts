
export interface LookupDto<Type> {
  (info: Type): Type;
  id: Type;
  name: string;
}
