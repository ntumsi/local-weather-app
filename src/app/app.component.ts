import { Component } from '@angular/core';
import { TemperatureUnit } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LocalCast Weather';
  city = 'Manchester';
  country = 'UK';
  selectedUnit: TemperatureUnit = 'imperial';
  latitude: number | null = null;
  longitude: number | null = null;
  geoError = '';

  useSearchedLocation() {
    this.latitude = null;
    this.longitude = null;
    this.geoError = '';
  }

  useMyLocation() {
    if (!navigator.geolocation) {
      this.geoError = 'Geolocation is not supported by this browser.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.geoError = '';
      },
      () => {
        this.geoError = 'Unable to access your current location.';
      }
    );
  }
}
