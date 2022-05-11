import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
    });
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  signup() {
    this.authService.register(this.authForm);
  }
  userLogin() {
    const request = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }
    this.authService.login(request);
  }
}
