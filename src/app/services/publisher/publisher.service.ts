import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreatePublisher, Publisher } from '../../models/publisher.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor() { }
  private http= inject(HttpClient);
  private urlBase = environment.apiUrl + '/api/publishers';

  public getAllPublishers(): Observable<Publisher[]>{
    return this.http.get<Publisher[]>(this.urlBase);
  }

  public createPublisher( publisher: CreatePublisher){
    return this.http.post(this.urlBase, publisher);
  }

    public getById(id: number): Observable<Publisher>{
    return this.http.get<Publisher>(`${this.urlBase}/${id}`);
  }

  public updatePublisher(id: number, Publisher: CreatePublisher){
    return this.http.put(`${this.urlBase}/${id}`, Publisher);
  }

  public deletePublisher(id: number) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
