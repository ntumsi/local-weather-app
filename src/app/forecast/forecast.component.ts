import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IForecastItem, TemperatureUnit } from '../interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, OnChanges {
  @Input() city = '';
  @Input() country = '';
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() unit: TemperatureUnit = 'imperial';

  forecast: IForecastItem[] = [];
  loading = false;
  errorMessage = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadForecast();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.city || changes.country || changes.latitude || changes.longitude || changes.unit) {
      this.loadForecast();
    }
  }

  private loadForecast() {
    const hasCitySearch = !!this.city && !!this.country;
    const hasCoordinates = this.latitude !== null && this.longitude !== null;
    if (!hasCitySearch && !hasCoordinates) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const forecastRequest = hasCoordinates
      ? this.weatherService.getForecastByCoords(this.latitude as number, this.longitude as number, this.unit)
      : this.weatherService.getForecastByCity(this.city, this.country, this.unit);

    forecastRequest.subscribe(
      (data) => {
        this.forecast = data;
        this.loading = false;
      },
      () => {
        this.errorMessage = 'Unable to load forecast data.';
        this.loading = false;
      }
    );
  }
}
