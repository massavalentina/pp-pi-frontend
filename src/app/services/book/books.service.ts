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

public GetAllBooks(): Observable<IBook[]>{
  return this.http.get<IBook[]>(this.urlBase);
}

public GetBookById(id:number):Observable<IBook>{
  return this.http.get<IBook>(`${this.urlBase}/${id}`);
}

  public CreateBook( book: IBookCreation){
    return this.http.post(this.urlBase, book);
  }

public UpdateBook(id:number, book:IBookCreation){
  return this.http.put(`${this.urlBase}/${id}`, book);
}

public DeleteBook(id:number){
  return this.http.delete(`${this.urlBase}/${id}`);
}

}
