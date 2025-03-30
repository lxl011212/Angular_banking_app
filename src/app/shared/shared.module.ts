import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

import { CustomButtonComponent } from './custom-button/custom-button.component';

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  exports: [
    CustomButtonComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule
  ]
})
export class SharedModule {}

