import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IBookCreation, IBook } from '../../models/books.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }
   private http= inject(HttpClient);
  private urlBase = environment.apiUrl + '/api/books';

// Get All books method
public GetAll(): Observable<IBook[]>{
  return this.http.get<IBook[]>(this.urlBase);
}

// Get books by its ID method
public GetById(id:number):Observable<IBook>{
  return this.http.get<IBook>(`${this.urlBase}/${id}`);
}

// Creation of books method
public Create(book:IBookCreation){
  return this.http.post(this.urlBase, book);
}

// Update of an book method
public Update(id:number, book:IBookCreation){
  return this.http.put(`${this.urlBase}/${id}`, book);
}

// Delete of an book method
public Delete(id:number){
  return this.http.delete(`${this.urlBase}/${id}`);
}

}
