import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginDto} from '../../../common/dto';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  minLengthForPassword: number = 1;

  @Output() loginEvent$: EventEmitter<LoginDto> = new EventEmitter<LoginDto>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLengthForPassword)]],
      remember: [],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.f.remember.touched) {
      this.f.remember.setValue(true);
    }

    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    const loginData: LoginDto = {
      email: email,
      password: password,
    };

    this.loginEvent$.emit(loginData);
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

}
