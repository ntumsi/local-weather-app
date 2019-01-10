import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ICurrentWeather} from '../interfaces';

export interface IWeatherService {
  getCurrentWeather(city: String, country: String): Observable<ICurrentWeather>;
  }

interface ICurrentWeatherData {
  weather: [{description: String,
icon: String }];
  main: { temp: number};
  sys: {
    country: String
  };
  dt: number;
  name: String;

}


@Injectable({
 providedIn: 'root'
 })
export class WeatherService {

private transformToICurrentWeather(data: ICurrentWeatherData):
ICurrentWeather {
  return{
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    temperature: this.convertKelvinToFahrenheit(data.main.temp),
    description: data.weather[0].description
  };

}
private convertKelvinToFahrenheit(Kelvin: number): number {
  return Kelvin * 9 / 5 - 459.7;
}

  constructor( private httpClient: HttpClient) { }
getICurrentWeather (city: String, country: String): Observable<ICurrentWeather> {
  return this.httpClient.get<ICurrentWeatherData>(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}
  &appId=${environment.appId}`).pipe (map (data => this.transformToICurrentWeather(data) ));
}

}

