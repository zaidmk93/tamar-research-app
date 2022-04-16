import { NgModule } from '@angular/core';
import { EnteringFormComponent } from './entering-form/entering-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RotateScreenComponent } from './rotate-screen/rotate-screen.component';

@NgModule({
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
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
