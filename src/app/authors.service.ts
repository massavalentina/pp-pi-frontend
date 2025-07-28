import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { authorCreation } from './pages/ruta2/authors.models';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor() { }
   private http= inject(HttpClient);
  private urlBase = environment.apiUrl + '/api/authors';

  public create(author:authorCreation){
    return this.http.post(this.urlBase, author);
  }
}
