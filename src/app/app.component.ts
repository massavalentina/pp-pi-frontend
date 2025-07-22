import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherforecastService } from './weatherforecast.service';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherForecastService = inject(WeatherforecastService);

  climates: any[] = [];

  constructor() {
    this.weatherForecastService.getWeatherForecast().subscribe(data => {
      this.climates = data;
    });
  }
}
