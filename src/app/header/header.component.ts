import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.userInfo.subscribe((res) => {
      this.isLoggedIn = res && res.accessToken ? true : sessionStorage.length > 0 && JSON.parse(sessionStorage['userInfo'])?.accessToken ? true : false;
    }, (error: any) => {
      console.log(error);
    });
  }

  signout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.authService.setUser(null);
    this.router.navigate(['/login']);
  }

}
