import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserAddress } from 'src/app/user/common/interfaces';

@Component({
  selector: 'app-checkout-address-list-desktop',
  templateUrl: './address-list-desktop.component.html',
  styleUrls: ['./address-list-desktop.component.scss']
})
export class CheckoutAddressListDesktopComponent implements OnInit {

  @Input() userAddresses: UserAddress[];
  @Input() checkoutDeliveryAddressId: string;
  @Input() checkoutBillingAddressId: string;

  @Output() addAddress = new EventEmitter();
  @Output() editAddress = new EventEmitter<UserAddress>();
  @Output() deleteAddress = new EventEmitter<UserAddress>();
  @Output() selectCheckoutDeliveryAddress = new EventEmitter<UserAddress>();
  @Output() selectCheckoutBillingAddress = new EventEmitter<UserAddress>();

  ngOnInit() {}

  onAddUserAddress() {
    this.addAddress.emit();
  }

  onEditUserAddress(address: UserAddress) {
    this.editAddress.emit(address);
  }

  onDeleteUserAddress(address: UserAddress) {
    this.deleteAddress.emit(address);
  }

  onSelectCheckoutDeliveryAddress(address: UserAddress) {
    this.selectCheckoutDeliveryAddress.emit(address);
  }

  onSelectCheckoutBillingAddress(address: UserAddress) {
    this.selectCheckoutBillingAddress.emit(address);
  }
}
