import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {

  constructor() { }
  private http= inject(HttpClient);
  private urlBase = environment.apiUrl + '/weatherForecast';

  public getWeatherForecast() {
    return this.http.get<any>(this.urlBase);
  }
}
