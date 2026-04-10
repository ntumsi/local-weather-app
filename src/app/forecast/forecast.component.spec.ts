import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ForecastComponent } from './forecast.component';
import { WeatherService } from '../weather/weather.service';
import { WeatherServiceFake } from '../weather/weather.service.fake';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastComponent ],
      providers: [ {provide: WeatherService, useClass: WeatherServiceFake} ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load forecast by city and country', () => {
    const service = TestBed.get(WeatherService);
    const citySpy = spyOn(service, 'getForecastByCity').and.returnValue(of([]));
    component.city = 'London';
    component.country = 'UK';
    component.latitude = null;
    component.longitude = null;
    component.ngOnInit();
    expect(citySpy).toHaveBeenCalledWith('London', 'UK', 'imperial');
  });

  it('should load forecast by coordinates when provided', () => {
    const service = TestBed.get(WeatherService);
    const coordSpy = spyOn(service, 'getForecastByCoords').and.returnValue(of([]));
    component.city = '';
    component.country = '';
    component.latitude = 37;
    component.longitude = -122;
    component.ngOnInit();
    expect(coordSpy).toHaveBeenCalledWith(37, -122, 'imperial');
  });
});
