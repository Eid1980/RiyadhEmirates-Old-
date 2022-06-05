import { Component, OnInit } from '@angular/core';
import { MessageType } from '@shared/enums/message-type.enum';
import { FileManagerService } from '@shared/services/file-manager.service';
import { GlobalService } from '@shared/services/global.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-list-poster',
  templateUrl: './list-poster.component.html',
  styleUrls: ['./list-poster.component.scss']
})
export class ListPosterComponent implements OnInit {
  posters:any[]=[];
  id:number;

  constructor( private fileManagerService:FileManagerService,
    private globalService:GlobalService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.fileManagerService.getByEntityName('Poster').subscribe((res:any[]) =>{
     this.posters = res;
    });
  }
  
  onRemove(id){
    this.confirmationService.confirm({
      message:'هل تريد حذف هذا الإعلان؟',
      acceptLabel:'نعم',
      rejectLabel:'لا',
      accept:()=>{
        this.fileManagerService.delete(id).subscribe(res=>{
          this.getAll();
          this.globalService.messageAlert(MessageType.Success,'تم حذف الإعلان');
         })
      }
  });
  }

  changeStatus(id,event){
    this.fileManagerService.changeStatus(id).subscribe(res=>{
      this.getAll();
      this.globalService.messageAlert(MessageType.Success,'تم تغيير الحالة');
     })
  }

}
