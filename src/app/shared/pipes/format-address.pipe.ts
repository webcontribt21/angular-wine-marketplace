import { Pipe, PipeTransform } from '@angular/core';
import { UserAddress } from 'src/app/user/common/interfaces';

@Pipe({ name: 'formatAddress' })
export class FormatAddressPipe implements PipeTransform {

  constructor() { }

  transform(value: UserAddress, args?: any): string {
    if (value) {
      const addressParts: string[] = [];
      if (value.isBusiness) {
        if (value.businessName){
          addressParts.push(value.businessName);
        }
      }

      if (value.complexBuilding) {
        addressParts.push(value.complexBuilding);
      }

      addressParts.push(value.streetAddress);
      addressParts.push((value.city && value.city.name) || '[CITY]');
      addressParts.push(value.postalCode);

      return addressParts.join(', ');
    }
    return null;
  }
}
