import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ICurrentWeather, TemperatureUnit} from '../interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {
  @Input() city = '';
  @Input() country = '';
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() unit: TemperatureUnit = 'imperial';

  current: ICurrentWeather;
  loading = false;
  errorMessage = '';

  constructor (private weatherService: WeatherService) {
    this.current = {
      city: '',
      country: '',
      date:  0,
      image: '',
      temperature: 0,
      description: '',
      humidity: 0,
      pressure: 0,
      windSpeed: 0
  };

  }

  ngOnInit() {
    this.loadWeather();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.city || changes.country || changes.latitude || changes.longitude || changes.unit) {
      this.loadWeather();
    }
  }

  private loadWeather() {
    const hasCitySearch = !!this.city && !!this.country;
    const hasCoordinates = this.latitude !== null && this.longitude !== null;
    if (!hasCitySearch && !hasCoordinates) {
      return;
    }

    this.errorMessage = '';
    this.loading = true;
    const weatherRequest = hasCoordinates
      ? this.weatherService.getCurrentWeatherByCoords(this.latitude, this.longitude, this.unit)
      : this.weatherService.getCurrentWeather(this.city, this.country, this.unit);

    weatherRequest.subscribe(
      (data) => {
        this.current = data;
        this.loading = false;
      },
      () => {
        this.errorMessage = 'Unable to load current weather.';
        this.loading = false;
      }
    );
  }

}
