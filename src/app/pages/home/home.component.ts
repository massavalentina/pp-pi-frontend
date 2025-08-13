import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherforecastService } from '../../weatherforecast.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  weatherForecastService = inject(WeatherforecastService);

  climates: any[] = [];

  constructor() {
    this.weatherForecastService.getWeatherForecast().subscribe(data => {
      this.climates = data;
    });
  }
}

