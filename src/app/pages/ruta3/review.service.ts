import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreationReview, Review } from './reviews.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl + '/api/reviews';

  public obtenerTodos(): Observable<Review[]> {
    return this.http.get<Review[]>(this.urlBase);
  }

  public obtenerPorId(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.urlBase}/${id}`);
  }

  public crear(review: CreationReview) {
    return this.http.post(this.urlBase, review);
  }

  public actualizar(id: number, review: CreationReview): Observable<Review> {
    return this.http.put<Review>(`${this.urlBase}/${id}`, review);
  }

  public borrar(id: number){
    return this.http.delete(`${this.urlBase}/${id}`)
  }
}
