import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './helpers';
import { SIGN_UP_CONFIG } from '../../../../../config';
import { Roles } from '../../../common/enums';
import { newUserDto } from '../../../common/dto';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  submitted = false;
  isShow = false;
  minLengthForPassword: number = SIGN_UP_CONFIG.password.min;

  form: FormGroup;

  @Output() submit$: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(SIGN_UP_CONFIG.password.min)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(SIGN_UP_CONFIG.password.min)]],
        remember: [false]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.f.remember.touched) {
      this.f.remember.setValue(true);
    }

    if (this.form.invalid) {
      return;
    }

    const { firstName, lastName, email, password } = this.form.value;

    const userData: newUserDto = {
      firstName,
      lastName,
      email,
      password,
      userTypeNo: Roles.CUSTOMER
    };

    this.submit$.emit(userData);
  }

  ngOnDestroy(): void {
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  switchTypePassword() {
    this.isShow = !this.isShow;
  }
}
