import { Observable, of} from 'rxjs';
import {IWeatherService} from './weather.service';
import { ICurrentWeather, IForecastItem, TemperatureUnit } from '../interfaces';

export class WeatherServiceFake implements IWeatherService {
private fakeWeather: ICurrentWeather = {
  city: 'Bursa',
  country: 'TR',
  date: 1485789600000,
  image: '',
  temperature: 72,
  description: 'light intensity drizzle',
  humidity: 65,
  pressure: 1012,
  windSpeed: 6,
};
private fakeForecast: IForecastItem[] = [
  {
    date: 1485789600000,
    temperature: 72,
    minTemperature: 68,
    maxTemperature: 75,
    description: 'light clouds',
    image: ''
  }
];

public getCurrentWeather(city: string, country: string, unit: TemperatureUnit = 'imperial'): Observable<ICurrentWeather> {
  return of (this.fakeWeather);
}

public getCurrentWeatherByCoords(lat: number, lon: number, unit: TemperatureUnit = 'imperial'): Observable<ICurrentWeather> {
  return of(this.fakeWeather);
}

public getForecastByCity(city: string, country: string, unit: TemperatureUnit = 'imperial'): Observable<IForecastItem[]> {
  return of(this.fakeForecast);
}

public getForecastByCoords(lat: number, lon: number, unit: TemperatureUnit = 'imperial'): Observable<IForecastItem[]> {
  return of(this.fakeForecast);
}

public getICurrentWeather(city: string, country: string, unit: TemperatureUnit = 'imperial'): Observable<ICurrentWeather> {
  return this.getCurrentWeather(city, country, unit);
}
}
