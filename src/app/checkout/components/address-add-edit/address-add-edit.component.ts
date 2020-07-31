import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { UserAddress } from 'src/app/user/common/interfaces';
import { Country } from 'src/app/shared/interfaces/country.interface';
import { State } from 'src/app/shared/interfaces/state.interface';
import { City } from 'src/app/shared/interfaces/city.interface';
import { Suburb } from 'src/app/shared/interfaces/suburb.interface';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { untilDestroy } from '@ngrx-utils/store';

interface Quantity {
  name: string;
  code: string;
}

@Component({
  selector: 'app-checkout-address-add-edit',
  templateUrl: './address-add-edit.component.html',
  styleUrls: ['./address-add-edit.component.scss']
})
export class CheckoutAddressAddEditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() address: UserAddress;
  @Input() countries: Country[];
  @Input() isAddMode = false;
  @Input() isFirstAddress = false;

  @Output() save = new EventEmitter<UserAddress>();
  @Output() cancel = new EventEmitter();

  public submitted = false;
  public form: FormGroup;

  deliveryTypes: SelectItem[];
  states: State[];
  cities: City[];
  suburbs: Suburb[];

  selectedCountry: Country;

  constructor(private fb: FormBuilder) {
    this.deliveryTypes = [{ label: 'Residential', value: false }, { label: 'Business', value: true }];
  }

  ngOnInit() {
    if (this.countries && this.countries.length === 1) {
      this.selectedCountry = this.countries[0];
    }
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.address) {
      this.initForm();
    }
  }

  // required
  ngOnDestroy() { }

  onSave() {
    this.submitted = true;
    if (this.form.valid) {
      const adddress = this.getFormData();
      this.save.emit(adddress);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  initForm(): void {
    console.log('initForm =>', this.address);

    this.form = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      cellNumber: this.fb.control('', Validators.required),
      isBusiness: this.fb.control(true, validateIsBusiness),
      streetAddress: this.fb.control('', Validators.required),
      businessName: this.fb.control('', validateRequiredIfBusiness),
      vatNumber: this.fb.control(null, validateRequiredIfBusiness),
      complexBuilding: this.fb.control(''),
      country: this.fb.control(null, Validators.required),
      state: this.fb.control(null, Validators.required),
      city: this.fb.control(null, Validators.required),
      suburb: this.fb.control(null, Validators.required),
      postalCode: this.fb.control('', Validators.required)
    });

    if (this.address) {
      const country = this.selectedCountry;
      const state = this.selectedCountry && this.selectedCountry.states.find(f => f._id === this.address.state_id);
      const city = state && state.cities.find(f => f._id === this.address.city_id);
      const suburb = city && city.suburbs.find(f => f._id === this.address.suburb_id);
      this.form.patchValue({
        ...this.address,
        country,
        state,
        city,
        suburb
      });
    }

    this.form.get('country').valueChanges.pipe(
      untilDestroy(this)
    ).subscribe((country: Country) => {
      this.form.get('state').setValue(null, { onlySelf: true });
    });

    this.form.get('state').valueChanges.pipe(
      untilDestroy(this)
    ).subscribe((state: State) => {
      this.form.get('city').setValue(null, { onlySelf: true });
    });

    this.form.get('city').valueChanges.pipe(
      untilDestroy(this)
    ).subscribe((city: City) => {
      this.form.get('suburb').setValue(null, { onlySelf: true });
    });
  }

  getFormData(): UserAddress {
    const { country, state, city, suburb, ...address } = this.form.value;
    return {
      ...this.address,
      ...address,
      // tslint:disable-next-line:no-string-literal
      country_id: country['_id'],
      // tslint:disable-next-line:no-string-literal
      state_id: state['_id'],
      // tslint:disable-next-line:no-string-literal
      city_id: city['_id'],
      // tslint:disable-next-line:no-string-literal
      suburb_id: suburb['_id'],
      isResidential: !this.form.get('isBusiness').value
    };
  }

  searchStates({ query }) {
    this.states = (this.selectedCountry
      && this.selectedCountry.states.filter(f => f.name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())))|| [];
  }

  searchCities({ query }) {
    const state: State = this.form.get('state').value;
    this.cities = (state && state.cities.filter(f => f.name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase()))) || [];
  }

  searchSuburbs({ query }) {
    const city: City = this.form.get('city').value;
    this.suburbs = (city && city.suburbs.filter(f => f.name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase()))) || [];
  }
}

function validateIsBusiness(control: AbstractControl) {
  const parent = control.parent;
  if (parent) {
    const businessName = parent.get('businessName');
    const vatNumber = parent.get('vatNumber');
    businessName.updateValueAndValidity({ onlySelf: true });
    vatNumber.updateValueAndValidity({ onlySelf: true });
    return null;
  }
}

function validateRequiredIfBusiness(control: AbstractControl) {
  const parent = control.parent;
  if (parent) {
    const isBusiness = parent.get('isBusiness').value;
    if (isBusiness) {
      return Validators.required(control);
    }
    return null;
  }
}
