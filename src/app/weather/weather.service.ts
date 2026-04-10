import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ICurrentWeather, IForecastItem, TemperatureUnit} from '../interfaces';

export interface IWeatherService {
  getCurrentWeather(city: string, country: string, unit?: TemperatureUnit): Observable<ICurrentWeather>;
   }

interface ICurrentWeatherData {
  weather: Array<{description: string, icon: string }>;
  main: { temp: number, humidity: number, pressure: number };
  sys: {
    country: string
  };
  wind: {
    speed: number
  };
  dt: number;
  name: string;
}

interface IForecastWeatherData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

@Injectable({
 providedIn: 'root'
 })
export class WeatherService {
  private readonly weatherUrl = `${environment.baseUrl}weather`;
  private readonly forecastUrl = `${environment.baseUrl}forecast`;

private transformToICurrentWeather(data: ICurrentWeatherData):
ICurrentWeather {
  return{
    city: data.name,
    country: data.sys.country || '',
    date: data.dt * 1000,
    image: this.getImageUrl(data.weather[0].icon),
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind ? data.wind.speed : 0
  };

}

private transformToIForecast(data: IForecastWeatherData): IForecastItem[] {
  return data.list.filter((_, index) => index % 8 === 0).map(item => ({
    date: item.dt * 1000,
    temperature: item.main.temp,
    minTemperature: item.main.temp_min,
    maxTemperature: item.main.temp_max,
    description: item.weather[0].description,
    image: this.getImageUrl(item.weather[0].icon)
  }));
}

private getImageUrl(iconCode: string): string {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
}

private createQueryParams(params: {[param: string]: string}): HttpParams {
  let httpParams = new HttpParams().set('appid', environment.appId);
  Object.keys(params).forEach((key) => {
    httpParams = httpParams.set(key, params[key]);
  });
  return httpParams;
}

  constructor( private httpClient: HttpClient) { }

getCurrentWeather(city: string, country: string, unit: TemperatureUnit = 'imperial'): Observable<ICurrentWeather> {
  return this.httpClient.get<ICurrentWeatherData>(
    this.weatherUrl,
    { params: this.createQueryParams({q: `${city},${country}`, units: unit}) }
  ).pipe(map(data => this.transformToICurrentWeather(data)));
}

getCurrentWeatherByCoords(lat: number, lon: number, unit: TemperatureUnit = 'imperial'): Observable<ICurrentWeather> {
  return this.httpClient.get<ICurrentWeatherData>(
    this.weatherUrl,
    { params: this.createQueryParams({lat: `${lat}`, lon: `${lon}`, units: unit}) }
  ).pipe(map(data => this.transformToICurrentWeather(data)));
}

getForecastByCity(city: string, country: string, unit: TemperatureUnit = 'imperial'): Observable<IForecastItem[]> {
  return this.httpClient.get<IForecastWeatherData>(
    this.forecastUrl,
    { params: this.createQueryParams({q: `${city},${country}`, units: unit}) }
  ).pipe(map(data => this.transformToIForecast(data)));
}

getForecastByCoords(lat: number, lon: number, unit: TemperatureUnit = 'imperial'): Observable<IForecastItem[]> {
  return this.httpClient.get<IForecastWeatherData>(
    this.forecastUrl,
    { params: this.createQueryParams({lat: `${lat}`, lon: `${lon}`, units: unit}) }
  ).pipe(map(data => this.transformToIForecast(data)));
}

getICurrentWeather(city: string, country: string, unit: TemperatureUnit = 'imperial'): Observable<ICurrentWeather> {
  return this.getCurrentWeather(city, country, unit);
}

}
