import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DataListSetting } from "@shared/interfaces/data-list-setting";
import { ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-data-list",
  templateUrl: "./data-list.component.html",
  styleUrls: ["./data-list.component.scss"]
})
export class DataListComponent implements OnInit, OnChanges {
  constructor() {}

  @Input()
  dataListSetting: DataListSetting;

  @Input()
  formSubmitted = false;
  displayLoading: boolean;
  filteredArray: any[] = [];

  ngOnInit() {}

  ngOnChanges() {}

  filterArray(event: any, arrayObject: any[], ColName = "FullArabicName") {
    this.filteredArray = [];
    for (const item of arrayObject) {
      let itemFullName = item[ColName];

      itemFullName = itemFullName.replace(/\s/g, "").toLowerCase();
      const queryString = event.query.replace(/\s/g, "").toLowerCase();
      if (itemFullName.indexOf(queryString) >= 0) {
        this.filteredArray.push(item);
      }
    }
  }
}
