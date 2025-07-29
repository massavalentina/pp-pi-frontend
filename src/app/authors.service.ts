import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IAuthorCreation, IAuthors } from './pages/ruta2/authors.models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor() { }
   private http= inject(HttpClient);
  private urlBase = environment.apiUrl + '/api/authors';

// Get All authors method
public GetAll(): Observable<IAuthors[]>{
  return this.http.get<IAuthors[]>(this.urlBase);
}

// Get authors by its ID method
public GetById(id:number):Observable<IAuthors>{
  return this.http.get<IAuthors>(`${this.urlBase}/${id}`);
}

// Creation of authors method
public Create(author:IAuthorCreation){
  return this.http.post(this.urlBase, author);
}

// Update of an author method
public Update(id:number, author:IAuthorCreation){
  return this.http.put(`${this.urlBase}/${id}`, author);
}

// Delete of an author method
public Delete(id:number){
  return this.http.delete(`${this.urlBase}/${id}`);
}

}
