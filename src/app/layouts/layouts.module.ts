import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    LayoutUserComponent,
    LayoutBlankComponent
  ],
  declarations: [LayoutBlankComponent, LayoutUserComponent]
})
export class LayoutsModule { }
