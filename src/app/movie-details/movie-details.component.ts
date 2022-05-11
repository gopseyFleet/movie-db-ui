import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieServicesService } from '../movie-services.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieId: any;
  movieDetails: any = null;
  userDetails: any = [];
  addReviewForm: FormGroup = new FormGroup({});

  constructor(private router: ActivatedRoute, private movieService: MovieServicesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.movieId = this.router.snapshot.params['id'];
    this.getMovieDetailsById();
    this.userDetails = JSON.parse(sessionStorage['userInfo']);
    this.addReviewForm = this.fb.group({
      review: [''],
    });
  }

  getMovieDetailsById() {
    this.movieService.getMovieById(this.movieId).subscribe((response: any) => {
      if (response && response.id) {
        this.movieDetails = response;
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  voteMovie(voteType: any) {
    const request = {
      "movieId": null,
      "userId": null,
      "upvote": false
    }
    request.movieId = this.movieDetails.id;
    request.userId = this.userDetails?.id;
    request.upvote = voteType ? true : false;
    this.movieService.voteMovie(request).subscribe((response: any) => {
      if (response) {
        this.getMovieDetailsById();
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  addReview() {
    const request = {
      "movieId": null,
      "review": "",
      "userId": null
    }
    request.movieId = this.movieDetails.id;
    request.userId = this.userDetails?.id;
    request.review = this.addReviewForm.value.review;
    this.movieService.addReview(request).subscribe((response: any) => {
      if (response) {
        this.getMovieDetailsById();
        this.addReviewForm.reset();
      }
    }, (error: any) => {
      console.log(error);
    });
  }
}
