import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatListModule
  ],
  exports: [
    MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatListModule
  ]

})
export class MaterialModule { }
