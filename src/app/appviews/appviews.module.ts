import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LoginMatDialogComponent } from './login/login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import {MaterialModule} from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../_auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {WebStorageService} from '../shared/services/web-storage.service';
import {AuthGuardService} from '../_auth/auth-guard.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CheckoutComponent, CheckoutMatDialogComponent } from './user/checkout/checkout.component';
import { TransferComponent, TransferMatDialogComponent } from './user/transfer/transfer.component';
import { CreateWalletComponent } from './user/create-wallet/create-wallet.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
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
    CheckoutMatDialogComponent,
    TransferMatDialogComponent,
    UserDashboardComponent,
    CreateAccountComponent,
    CheckoutComponent,
    TransferComponent,
    CreateWalletComponent
  ],
  entryComponents: [
    LoginComponent,
    LoginMatDialogComponent,
    CheckoutMatDialogComponent,
    TransferMatDialogComponent,
  ]
})
export class AppviewsModule { }
