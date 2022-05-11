import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieServicesService } from '../movie-services.service';

@Component({
  selector: 'app-show-recommended',
  templateUrl: './show-recommended.component.html',
  styleUrls: ['./show-recommended.component.scss']
})
export class ShowRecommendedComponent implements OnInit {

  public moviesList: any[] = [];

  constructor(private movieService: MovieServicesService, private router: Router) { }

  ngOnInit(): void {
    this.showRecommended();
  }

  showRecommended() {
    this.movieService.showRecommended().subscribe((response: any) => {
      if (response && response.totalElements > 0) {
        this.moviesList = response.content;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  goToMoviesDetails(movieDetails: any) {
    const movieId = movieDetails?.id;
    this.router.navigate([`movieDetails/${movieId}`]);
  }

}
