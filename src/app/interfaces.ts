export interface ICurrentWeather {
  city: string;
  country: string;
  date: number;
  image: string;
  temperature: number;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
}

export interface IForecastItem {
  date: number;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  description: string;
  image: string;
}

export type TemperatureUnit = 'imperial' | 'metric';
