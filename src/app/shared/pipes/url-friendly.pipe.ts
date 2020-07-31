import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { deburr } from 'lodash';

@Pipe({ name: 'urlfriendly' })
export class UrlFriendlyPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return deburr(value.replace(/\s+/g, '-').toLowerCase());
  }
}
