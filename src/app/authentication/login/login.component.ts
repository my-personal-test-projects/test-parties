import { Component } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public userForm: FormGroup;
  passwordTextType: boolean = true;

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    sessionStorage.clear();
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required,]],
    });
  }

  togglePasswordVisibility() {
    this.passwordTextType = !this.passwordTextType;
  }

  login() {
    if (this.userForm.invalid) {
      return;
    } else {     

      var json = {
        username:  this.userForm.get('userName')?.value,
        password:  this.userForm.get('password')?.value
      };

      this.service.login(json).subscribe(
        (res: any) => {
          if (res.user == true) {
            sessionStorage.setItem('token', res.token);

            this.toastr.success('You Are Successfully Login');
            this.router.navigate([`pages/parties`]);
          } else {
            this.toastr.error('Please check username and password');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
