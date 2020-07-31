import { Pipe, PipeTransform } from '@angular/core';
import { UserAddress } from 'src/app/user/common/interfaces';

@Pipe({ name: 'formatAddressRecipient' })
export class FormatAddressRecipientPipe implements PipeTransform {

  constructor() { }

  transform(value: UserAddress, args?: any): string {
    if (value) {
      return  value.firstName + ' ' + value.lastName;
    }
    return null;
  }
}
