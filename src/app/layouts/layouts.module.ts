import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    LayoutUserComponent,
    LayoutBlankComponent
  ],
  declarations: [LayoutBlankComponent, LayoutUserComponent]
})
export class LayoutsModule { }
