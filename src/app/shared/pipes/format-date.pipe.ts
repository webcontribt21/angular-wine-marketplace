import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {

  constructor(/*private datePipe: DatePipe*/) { }

  transform(value: any, args?: any): string {
    // return this.datePipe.transform(value, 'dd MMMM yyyy');
    return new DatePipe('en-ZA').transform(value, 'dd MMMM yyyy');
  }
}
