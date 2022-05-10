import { NgModule } from '@angular/core';
import { EnteringFormComponent } from './entering-form/entering-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RotateScreenComponent } from './rotate-screen/rotate-screen.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MaterialModule, FormsModule, ReactiveFormsModule,MatDatepickerModule,
    MatNativeDateModule,MatInputModule ],
  declarations: [EnteringFormComponent, RotateScreenComponent],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EnteringFormComponent,
    RotateScreenComponent,
  ],
  providers: [],
})
export class SharedModule {}
