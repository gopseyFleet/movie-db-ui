import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieServicesService } from '../movie-services.service';

@Component({
  selector: 'app-fav-genre',
  templateUrl: './fav-genre.component.html',
  styleUrls: ['./fav-genre.component.scss']
})
export class FavGenreComponent implements OnInit {

  addFavGenreForm: FormGroup = new FormGroup({});
  genresList: any = [];

  constructor(private fb: FormBuilder, private moviesService: MovieServicesService) { }

  ngOnInit(): void {
    this.addFavGenreForm = this.fb.group({
      genres: [''],
    });
    this.moviesService.getAllGenres().subscribe((res) => {
      if (res) {
        this.genresList = res;
      }
    });
  }
  addFavGenre() {
    let requestGenres: any[] = [];
    let genreValues = [];
    genreValues = [...this.addFavGenreForm.value.genres];
    genreValues.forEach((res: any) => {
      const individualGenre = { 'id': res.id, 'genre': res.genre }
      requestGenres.push(individualGenre);
    });
    const request = { "favouriteGenre": requestGenres };
    this.moviesService.addFavGenre(request, ).subscribe((response: any) => {
      if (response && response.id) {
        alert('Added Favourite Genre!');
        this.addFavGenreForm.reset();
      }
    }, (error: any) => {
      console.log(error);
    });
  }

}
