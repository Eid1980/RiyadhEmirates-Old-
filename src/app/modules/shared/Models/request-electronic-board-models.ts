
export interface CreateRequestElectronicBoardDto {
  requestTypeId: number;
  requestTitle: string;
  requestContent: string;
  notes: string;
}

export interface UpdateRequestElectronicBoardDto {
  id: string;
  requestTypeId: number;
  requestTitle: string;
  requestContent: string;
  notes: string;
  concurrencyStamp: string;
}


export interface RequestElectronicBoardDto {
  requestTypeId: number;
  canEdit: boolean;
  concurrencyStamp: string;
  createdBy: number;
  requestTitle: string;
  requestContent: string;
  notes: string;
}

export interface GetRequestElectronicBoardDetailsDto {
  id: string;
  requestNumber: string;
  serviceName: string;
  requestDate: string;
  requestStatusName: string;
  canEdit: boolean;
  concurrencyStamp: string;
  requestTypeName: string;
  requestTitle: string;
  requestContent: string;
  notes: string;
  createdBy: number;
}
