import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080';
  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, private router: Router) { }

  get user() {
    return this.userInfo.asObservable();
  }

  public setUser(user: any) {
    this.userInfo.next(user);
  }

  register(authForm: any) {
    const request = {
      "email": authForm.value.email,
      "firstName": authForm.value.firstName,
      "lastName": authForm.value.lastName,
      "password": authForm.value.password
    }
    this.httpClient.post(`${this.url}/api/auth/signup`, request).subscribe((res: any) => {
      if (res && res.message === 'User registered successfully! Please Login') {
        alert(res.message);
        const request = { 'username': authForm.value.email, 'password': authForm.value.password }
        this.login(request);
      }
    });
  }

  login(inputRequest: any) {
    this.httpClient.post(`${this.url}/api/auth/signin`, inputRequest).subscribe((res: any) => {
      if (res && res.accessToken) {
        sessionStorage.setItem('userInfo', JSON.stringify(res));
        this.setUser(res);
        this.router.navigate(['']);
      }
    });
  }
}
