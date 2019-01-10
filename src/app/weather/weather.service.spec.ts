import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { inject, } from '@angular/core/testing';

describe('WeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  providers: [WeatherService],
  imports: [HttpClientTestingModule],
  })
);

  it('should be created',  inject( [WeatherService], (service: WeatherService) => {
    // const service: WeatherService =TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  })
  );
});
