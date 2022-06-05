import { PageListSetting } from "./../../interfaces/page-list-setting";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PagingMetaData } from "@shared/models/paging-meta-data.model";
import { FormGroup } from "@angular/forms";
import { SearchModel } from "@shared/models/search-model.model";
import { SearchOperator } from "@shared/models/search-operator.model";
import { Subscription } from "rxjs";
import { DynamicSearchService } from "@shared/services/dynamic-search.service";
import { GlobalService } from "@shared/services/global.service";
import { TableService } from "@shared/services/table.service";

@Component({
  selector: "app-page-list",
  templateUrl: "./page-list.component.html",
  styleUrls: ["./page-list.component.scss"]
})
export class PageListComponent implements OnInit {
  dataItems: any[];
  @Input()
  PageListSetting: PageListSetting;

  @Output()
  modal = new EventEmitter();

  @Output()
  callBackEvent = new EventEmitter();

  pagingMetaData: PagingMetaData;
  searchForm: FormGroup;
  searchModel: SearchModel;
  searchOperators: SearchOperator[];
  private subscription: Subscription;

  constructor(
    public dynamicSearchService: DynamicSearchService,
    private globalService: GlobalService,
    private tableService: TableService
  ) {
    this.searchModel = {};
    this.subscription = new Subscription();
  }

  ngOnInit() {
    // build search form
    this.searchForm = this.dynamicSearchService.buildSearchForm(
      this.PageListSetting.cols
    );
    this.searchOperators = this.dynamicSearchService.searchOperators;
  }

  getData() {
    this.subscription.add(
      this.tableService
        .getListPage(this.PageListSetting.Url, this.searchModel)
        .subscribe(result => {
          if (result.IsSuccess) {
            this.dataItems = result.Data.GridItemsVM;
            this.pagingMetaData = result.Data.PagingMetaData;
          }
        })
    );
  }

  onTableLazyLoad(event: any) {
    this.dynamicSearchService.lazy(event, this.searchModel, () =>
      this.getData()
    );
  }

  onSearchReset() {
    this.searchModel = {};
    this.dynamicSearchService.reset(this.searchForm, () => this.getData());
  }

  search() {
    this.dynamicSearchService.search(this.searchForm, this.searchModel, () =>
      this.getData()
    );
  }

  toggleActionButtonVisibility(actions: string, actionName: string) {
    if (actions) {
      return actions.search(actionName) !== -1;
    } else {
      return true;
    }
  }

  callModal(event) {
    this.modal.emit(event);
  }

  callPageFunc(funcName: any, id: any, event?: any) {
    if (!event) {
      funcName(id);
    } else {
      funcName(id, event);
    }
  }
}
