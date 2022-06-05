import { TableColumn } from "./table-column.interface";
import { TableAction } from "@shared/models/table-action";

export interface PageListSetting {
  PageTitle?: string;
  listPermissionCode?: string;
  createButtonText?: string;
  createButtonLink?: string;
  createButtonPermissionCode?: string;
  cols: TableColumn[];
  actions: TableAction[];
  Url?: string;
}
