import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div >

       <mat-toolbar color="primary">
         <span> {{title}}</span>
        </mat-toolbar>
          <div fxLayoutAlign ="center">
             <div class="mat-caption vertical-margin">
              Your City, Your Forecast, right now!
              </div>
          </div>
    <div fxLayout="row">
       <div fxFlex></div>
          <div fxFlex="350px">
           <mat-card>
            <mat-card-title><div class="mat-headline">Current Weather</div></mat-card-title>
            <app-current-weather></app-current-weather>
            </mat-card>
          </div>
          <div fxFlex></div>
      </div>


 </div>
 `

})
export class AppComponent {
  title = 'Local Cast Weather';
}
