import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'higriDate'
})
export class HigriDatePipe implements PipeTransform {

  transform(value: Date): any {

    let higriDateFormat = ""
    let month = value.getMonth(); 

    //switch()
  }

}
