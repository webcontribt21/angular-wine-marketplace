import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyApiText'
})
export class BeautifyApiTextPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.replace(/\n/g, '<br />');
  }

}
