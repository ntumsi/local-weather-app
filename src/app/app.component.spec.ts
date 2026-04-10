import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { WeatherService } from './weather/weather.service';
import { WeatherServiceFake } from './weather/weather.service.fake';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ {provide: WeatherService, useClass: WeatherServiceFake}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
   const fixture = TestBed.createComponent(AppComponent);
   const app = fixture.debugElement.componentInstance;
   expect(app).toBeTruthy();
   }));
  // it(`should have as title 'local-weather-app'`, async(() => {
   // const fixture = TestBed.createComponent(AppComponent);
   // const app = fixture.debugElement.componentInstance;
   // expect(app.title).toEqual('local-weather-app');
  // }));
  it('should render title in toolbar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('LocalCast Weather');
  }));

  it('should clear coordinates when using searched location', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.latitude = 10;
    app.longitude = 20;
    app.geoError = 'error';
    app.useSearchedLocation();
    expect(app.latitude).toBeNull();
    expect(app.longitude).toBeNull();
    expect(app.geoError).toBe('');
  });

  it('should set coordinates from geolocation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successCallback: Function) => {
      successCallback({
        coords: {
          latitude: 51.5,
          longitude: -0.1
        }
      });
    });
    app.useMyLocation();
    expect(app.latitude).toBe(51.5);
    expect(app.longitude).toBe(-0.1);
  });
});
