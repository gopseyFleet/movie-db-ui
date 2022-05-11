import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieServicesService } from '../movie-services.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm: FormGroup = new FormGroup({});
  genresList: any = [];

  constructor(private fb: FormBuilder, private moviesService: MovieServicesService) { }

  ngOnInit(): void {
    this.addMovieForm = this.fb.group({
      movieName: [''],
      releaseDate: [''],
      genres: [''],
    });
    this.moviesService.getAllGenres().subscribe((res) => {
      if (res) {
        this.genresList = res;
      }
    });
  }
  addMovie() {
    let requestGenres: any[] = [];
    let genreValues = [];
    genreValues = [...this.addMovieForm.value.genres];
    genreValues.forEach((res: any) => {
      const individualGenre = { 'id': res.id, 'genre': res.genre }
      requestGenres.push(individualGenre);
    });
    const request = {
      "genres": requestGenres,
      "name": this.addMovieForm.value.movieName,
      "releaseDate": this.addMovieForm.value.releaseDate
    };
    this.moviesService.addMovie(request).subscribe((response: any) => {
      if (response && response.id) {
        alert('Added Movie!');
        this.addMovieForm.reset();
      }
    }, (error: any) => {
      console.log(error);
    });
  }

}
