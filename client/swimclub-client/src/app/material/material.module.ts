import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

const modules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules]
})
export class MaterialModule { }
