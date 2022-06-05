import { Component, OnInit, ViewChild } from '@angular/core';
import { PageListComponent } from '@shared/components/page-list/page-list.component';
import { ActionButtonClass } from '@shared/enums/action-button-class';
import { ActionButtonIcon } from '@shared/enums/action-button-icon';
import { ColumnPipe } from '@shared/enums/column-pipe.enum';
import { ColumnType } from '@shared/enums/column-type.enum';
import { PageListSetting } from '@shared/interfaces/page-list-setting';
import { DatePipeOptions } from '@shared/models/date-pipe-options.model';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
  @ViewChild(PageListComponent, { static: true }) list: PageListComponent;
  pageListSettings: PageListSetting;
  checked: true;

  constructor(
    private reportsService: ReportsService,
  ) {}

  ngOnInit() {
    this.pageSetting();
  }

  pageSetting() {
    this.pageListSettings = {
      PageTitle: "قائمة التقارير الإخبارية",
      listPermissionCode: "*",
      createButtonLink: "/data-management/reports-add",
      createButtonText: "انشاء تقرير جديد",
      Url: this.reportsService.serviceUrl,

      cols: [
        { Field: "Id", Header: "الكود", Searchable: false,Hidden:true },
        { Field: "TitleAr", Header: "العنوان باللغة العربية" },
        { Field: "TitleEn", Header: "العنوان باللغة الانجليزية" },
        { Field: "Date", Header: "التاريخ",
          Pipe:ColumnPipe.Date,PipeOptions:new DatePipeOptions() },
        {
          Field: "IsActive",
          Header: "الحالة",
          Searchable: false,
          Type: ColumnType.Status,
          FuncName: (id, event) => this.changeStatus(id, event),
        },
        {
          Field: "Action",
          Header: "الإجراءات",
          Searchable: false,
          Type: ColumnType.Action,
        },
      ],

      actions: [
        {
          title: "تعديل",
          routerLink: "/data-management/reports-edit",
          IsQueryParams: true,
          buttonclass: ActionButtonClass.Edit,
          buttonIcon: ActionButtonIcon.Edit,
        },
        {
          title: "التفاصيل",
          routerLink: "/data-management/reports-view",
          IsQueryParams: true,
          buttonclass: ActionButtonClass.View,
          buttonIcon: ActionButtonIcon.View,
        },
      ],
    };
  }

  changeStatus(id: number, e: any) {
    this.reportsService.changeStatus(id).subscribe((result) => {
      if (result.IsSuccess) {
        this.list.getData();
      }
    });
  }

}
