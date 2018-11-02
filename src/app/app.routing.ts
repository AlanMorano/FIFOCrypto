/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ModuleWithProviders} from '@angular/core/src/metadata/ng_module';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './_auth/auth-guard.service';
import {LoginComponent} from './appviews/login/login.component';
import {LayoutUserComponent} from './layouts/layout-user/layout-user.component';
import {LayoutBlankComponent} from './layouts/layout-blank/layout-blank.component';
import {CreateAccountComponent} from './appviews/create-account/create-account.component';
import {LogoutComponent} from './appviews/logout/logout.component';
import {ApiComponent} from './appviews/api/api.component';
import { CheckoutComponent } from './appviews/user/checkout/checkout.component';
import { UserDashboardComponent } from './appviews/user/user-dashboard/user-dashboard.component';
import { TransferComponent } from './appviews/user/transfer/transfer.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'api', component: ApiComponent},
  {
    path: 'user', component: LayoutUserComponent,
    children: [
      {path: 'dashboard', component: UserDashboardComponent},
      {path: 'transfer', component: TransferComponent},
      {path: 'checkout', component: CheckoutComponent}
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: '', component: LayoutBlankComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'create-account', component: CreateAccountComponent},
      {path: 'api', component: ApiComponent}
    ]
  },
  // Handle all other routes
  {path: '**', redirectTo: 'login'}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
