import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
  name: 'crossBoldString'
})
export class CrossBoldStringPipe implements PipeTransform {
  constructor(private sanitizer: Sanitizer) {
  }

  transform(value: any, ...args: any[]): any {
    const arr = value.replace(/\s+/g, '_').split('_');
    let html = '';

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      if (index % 3 !== 0) {
        html += '<span class="good-bold-font item">' + element + '</span>';
      } else {
        html += '<span class="item">' + element + '</span>';
      }
    }

    return this.sanitize(html);
  }

  sanitize(str: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, str);
  }
}
