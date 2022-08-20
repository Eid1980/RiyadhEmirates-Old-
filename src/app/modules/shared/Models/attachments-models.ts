
export interface GetRequestDetailsDto {
  id: string;
  serviceId: number;
  requestNumber: string;
  requestDate: string;
  stageId: number;
  canEdit: boolean;
  notes: string;
  concurrencyStamp: string;
  createdBy: number;
}

export interface RequestChangeStageDto {
  id: string;
  stageId: number;
  notes: string;
}

export interface GetRequestStageLogsDto {
  stageName: string;
  notes: string;
  createdByName: string;
  createdDate: string;
}

export interface GetAttachmentsDto {
  id: string;
  attachmentTypeId: number;
  attachmentName: string;
  extentionAllowed: string;
  maxFileSize?: number;
  attachmentIsRequired: boolean;
  isAdded: boolean;
  fileDescription: string;
}

export interface GetRequestAttachmentsDto {
  id: string;
  attachmentName: string;
  fileName: string;
}

export interface GetMyRequestListDto {
  id: string;
  serviceName: string;
  requestNumber: string;
  requestDate: string;
  stageName: string;
  notes: string;
  url: string;
}
export interface MyRequestSearchDto {
  requestNumber: string;
  serviceId: number;
  stageId: number;
  dateFrom: string;
  dateTo: string;
}

export interface GetInboxListDto {
  id: string;
  serviceName: string;
  requestNumber: string;
  requestDate: string;
  stageName: string;
  notes: string;
  url: string;
}
export interface InboxSearchDto {
  requestNumber: string;
  nationalId: string;
  serviceId: number;
  dateFrom: string;
  dateTo: string;
}
