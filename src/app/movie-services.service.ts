import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieServicesService {

  // url = 'http://www.omdbapi.com/?apikey=fcffca33&';
  url = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getMoviesByName(movieNameKeyWord: string) {
    const requestUrl = `${this.url}/public/movies?movieName=${movieNameKeyWord}`;
    return this.httpClient.get(requestUrl);
  }

  getAllMovies(authToken: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })  
    const requestUrl = `${this.url}/movie?page=0&size=10`;
    return this.httpClient.get(requestUrl, { headers: headers});
  }
  getAllGenres() {
    const requestUrl = `${this.url}/public/genres`;
    return this.httpClient.get(requestUrl);
  }
  getMovieById(movieId: any) {
    const requestUrl = `${this.url}/public/movie?id=${movieId}`;
    return this.httpClient.get(requestUrl);
  }
  addMovie(request: any) {
    const authToken = JSON.parse(sessionStorage['userInfo'])?.accessToken;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })  
    const requestUrl = `${this.url}/movie`;
    return this.httpClient.post(requestUrl, request, { headers: headers});
  }
  addFavGenre(request: any) {
    const userInformation = JSON.parse(sessionStorage['userInfo']);
    const authToken = userInformation?.accessToken;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    const requestUrl = `${this.url}/user/${userInformation.id}/favoritegenre`;
    return this.httpClient.post(requestUrl, request, { headers: headers});
  }
  showRecommended() {
    const userInformation = JSON.parse(sessionStorage['userInfo']);
    const authToken = userInformation?.accessToken;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })  
    const requestUrl = `${this.url}/movie/user/favGenre?userId=${userInformation.id}&page=0&size=10`;
    return this.httpClient.get(requestUrl, { headers: headers});
  }
  voteMovie(request: any) {
    const userInformation = JSON.parse(sessionStorage['userInfo']);
    const authToken = userInformation?.accessToken;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })  
    const requestUrl = `${this.url}/vote`;
    return this.httpClient.post(requestUrl, request, { headers: headers});
  }
  addReview(request: any) {
    const userInformation = JSON.parse(sessionStorage['userInfo']);
    const authToken = userInformation?.accessToken;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })  
    const requestUrl = `${this.url}/review`;
    return this.httpClient.post(requestUrl, request, { headers: headers});
  }
}
