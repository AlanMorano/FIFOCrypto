import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LoginMatDialogComponent } from './login/login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { ApiComponent } from './api/api.component';
import {MaterialModule} from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../_auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {WebStorageService} from '../shared/services/web-storage.service';
import {AuthGuardService} from '../_auth/auth-guard.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './user/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    HttpClientModule,
    AuthService,
    WebStorageService,
    AuthGuardService,
    UserService
  ],
  declarations: [
    LoginComponent,
    LoginMatDialogComponent,
    UserDashboardComponent,
    LogoutComponent, ApiComponent,
    CreateAccountComponent,
    NavComponent],
  entryComponents: [LoginComponent, LoginMatDialogComponent]
})
export class AppviewsModule { }
