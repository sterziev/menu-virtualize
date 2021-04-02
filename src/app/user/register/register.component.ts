import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  isSubmitted = false;
  public minLength = 2;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('init');

    this.registerForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [
            Validators.minLength(this.minLength),
            Validators.required,
            Validators.email,
          ],
          updateOn: 'blur',
        },
      ],
      restaurantName: [
        '',
        {
          validators: [
            Validators.minLength(this.minLength),
            Validators.required,
          ],
          updateOn: 'submit',
        },
      ],
      password: [
        '',
        {
          validators: [
            Validators.minLength(this.minLength),
            Validators.required,
          ],
          updateOn: 'blur',
        },
      ],
      password2: [
        '',
        {
          validators: [
            Validators.minLength(this.minLength),
            Validators.required,
          ],
          updateOn: 'blur',
        },
      ],
      firstName: [
        '',
        {
          validators: [
            Validators.minLength(this.minLength),
            Validators.required,
          ],
          updateOn: 'submit',
        },
      ],
      lastName: [
        '',
        {
          validators: [
            Validators.minLength(this.minLength),
            Validators.required,
          ],
          updateOn: 'submit',
        },
      ],
      phone: [
        '',
        {
          validators: [
            Validators.minLength(this.minLength),
            Validators.required,
          ],
          updateOn: 'submit',
        },
      ],
    });
  }

  get controls() {
    return this.registerForm.controls;
  }

  async errorToast(message: string) {
    this.toastr.error(message, 'Error');
  }

  register(formValues: any) {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      this.errorToast('Form is Invalid!');
      console.log('invalid', formValues);
    } else {
      console.log(formValues);
    }
  }

  isRestaurantNameInvalid() {
    if (
      this.controls.restaurantName.touched ||
      this.controls.restaurantName.dirty ||
      this.isSubmitted
    ) {
      return this.controls.restaurantName.invalid;
    }
    return false;
  }

  isEmailInvalid() {
    if (
      this.controls.email.touched ||
      this.controls.email.dirty ||
      this.isSubmitted
    ) {
      return this.controls.email.invalid;
    }
    return false;
  }

  isPasswordInvalid() {
    if (
      this.controls.password.touched ||
      this.controls.password.dirty ||
      this.isSubmitted
    ) {
      return this.controls.password.invalid;
    }
    return false;
  }

  isPassword2Invalid() {
    if (
      this.controls.password2.touched ||
      this.controls.password2.dirty ||
      this.isSubmitted
    ) {
      return this.controls.password2.invalid;
    }
    return false;
  }

  isFirstNameInvalid() {
    if (
      this.controls.firstName.touched ||
      this.controls.firstName.dirty ||
      this.isSubmitted
    ) {
      return this.controls.firstName.invalid;
    }
    return false;
  }

  isLastNameInvalid() {
    if (
      this.controls.lastName.touched ||
      this.controls.lastName.dirty ||
      this.isSubmitted
    ) {
      return this.controls.lastName.invalid;
    }
    return false;
  }

  isPhoneInvalid() {
    if (
      this.controls.phone.touched ||
      this.controls.phone.dirty ||
      this.isSubmitted
    ) {
      return this.controls.phone.invalid;
    }
    return false;
  }
}
