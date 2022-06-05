import { FormArray, FormGroup } from "@angular/forms";
import { TableColumn } from "./table-column.interface";

export interface DataListSetting {
  cols: TableColumn[];
  form?: FormGroup;
  formArray?: FormArray;
}
