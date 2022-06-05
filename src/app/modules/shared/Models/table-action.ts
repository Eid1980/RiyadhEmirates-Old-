import { ActionButtonClass } from "@shared/enums/action-button-class";
import { ActionButtonIcon } from "@shared/enums/action-button-icon";

export interface TableAction {
  title: string;
  routerLink?: string;
  text?: string;
  IsQueryParams?: boolean;
  FuncName?: (data?) => any;
  actionName?: string;
  dataTarget?: string;
  buttonclass: ActionButtonClass;
  buttonIcon: ActionButtonIcon;
  permissionCode?: string;
}
