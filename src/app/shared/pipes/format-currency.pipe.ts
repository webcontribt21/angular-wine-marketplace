import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { isNumber } from 'util';

@Pipe({ name: 'formatCurrency' })
export class FormatCurrencyPipe implements PipeTransform {

  constructor(/*private decimalPipe: DecimalPipe*/) { }

  transform(value: any, args?: any): string {
    const result = value || 0;
    const sign = (result < 0) ? '-' : '';
    return sign + 'R' + (new DecimalPipe('en-ZA').transform(Math.abs(result)));
  }
}
