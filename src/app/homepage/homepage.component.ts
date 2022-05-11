import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { MovieServicesService } from '../movie-services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  private searchValueSubject = new Subject<any>();
  public moviesList: any[] = [];
  public sortByValue: string = 'latestFirst';
  public isLoggedIn: boolean = false;

  constructor(private movieService: MovieServicesService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.userInfo.subscribe((res) => {
      if (res) {
        this.isLoggedIn = res.accessToken ? true : false;
      } else {
        this.isLoggedIn = sessionStorage.length > 0 && JSON.parse(sessionStorage['userInfo'])?.accessToken ? true : false;
      }
    });
    this.searchValueSubject.pipe((debounceTime(1000))).subscribe((response: any) => {
      this.performSearch(response);
    });
  }

  getAllMovies(authTokn: any) {
    const authToken = JSON.parse(sessionStorage['userInfo'])?.accessToken;
    this.movieService.getAllMovies(authToken ? authToken : authTokn).subscribe((response: any) => {
      if (response && response.totalElements > 0) {
        this.moviesList = response.content;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  onSearch(event: any) {
    const searchValue = event.target.value;
    if (searchValue.length >= 3) {
      this.searchValueSubject.next(searchValue);
    }
  }

  performSearch(searchValue: any) {
    this.movieService.getMoviesByName(searchValue).subscribe((response: any) => {
      if (response && response.totalElements > 0) {
        this.moviesList = response.content;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  onSortValChange(sortValue: any) {
    if (this.moviesList.length > 0) {
      if (sortValue.value === 'latestFirst') {
        this.moviesList = this.moviesList.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      } else {
        this.moviesList = this.moviesList.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      }
    }
  }

  goToMoviesDetails(movieDetails: any) {
    const movieId = movieDetails?.id;
    this.router.navigate([`movieDetails/${movieId}`]);
  }
}
