import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  badCredentials = false;

  constructor(
    private formBuilder: FormBuilder,
    // public toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('init');

    this.loginForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [
            Validators.minLength(2),
            Validators.required,
            Validators.email,
          ],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        { validators: [Validators.minLength(2), Validators.required] },
      ],
    });
  }

  isEmailValid() {
    if (this.badCredentials) {
      return false;
    }
    if (this.controls.email.touched || this.controls.email.dirty) {
      console.log('touched', this.controls.email.valid);

      return this.controls.email.valid;
    }
    return true;
  }

  isPasswordValid() {
    if (this.badCredentials) {
      return false;
    }

    return true;
  }

  get controls() {
    return this.loginForm.controls;
  }

  async errorToast(message: string) {
    console.log('error toast');
  }

  login(formValues: any) {
    console.log(formValues);
    this.badCredentials = true;
    this.controls.password.reset();

    // this.userService.login(formValues).subscribe(
    //   (data) => {
    //     const user = new UserModel(data);
    //     this.route.queryParams.subscribe((params) => {
    //       this.userService.saveLoggedUser(user);
    //       const routeTo = params['returnUrl'] ? params['returnUrl'] : '';
    //       this.router.navigate([routeTo]);
    //       this.loginForm.reset();
    //     });
    //   },
    //   (error) => {
    //     console.log(error);
    //     if (error.status && error.status === 401) {
    //       this.badCredentials = true;
    //       this.controls['email'].reset();
    //       this.controls['password'].reset();
    //       this.errorToast('Invalid Credentials');
    //     } else {
    //       this.errorToast('Failed to login. Please try later');
    //     }
    //   }
    // );
  }
}
