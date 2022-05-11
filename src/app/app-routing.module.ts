import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FavGenreComponent } from './fav-genre/fav-genre.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ShowRecommendedComponent } from './show-recommended/show-recommended.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addMovie', component: AddMovieComponent },
  { path: 'favGenre', component: FavGenreComponent },
  { path: 'showRecommended', component: ShowRecommendedComponent },
  { path: 'movieDetails/:id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
