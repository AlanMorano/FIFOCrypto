import { Component, OnInit, Inject, enableProdMode, isDevMode  } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {WebStorageService} from '../../shared/services/web-storage.service';
import {MLogin} from '../../shared/models/m-login.model';
import {MResponseDefault} from '../../shared/models/m-response-default.model';
import {environment} from '../../../environments/environment';
import {TblUsers} from '../../tempDB/tbl-users';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MUser } from 'src/app/shared/models/m-user.model';

export interface DialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: string;
  message: string;
  mLogin = new MLogin();
  isLoginShown = true;
  isLoadShown = false;
  isCreateShown = true;
  constructor(
    private loginSvc: LoginService,
    private router: Router,
    private webStoreSvc: WebStorageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    if (!environment.production) {
      this.mLogin = new MLogin({email: 'abmorano11@gmail.com', password: 'User@123'});
      console.log(isDevMode());
    } else {
      this.mLogin = new MLogin({email: 'juan10@email.com', password: '12345'});
    }
  }

  onSubmit(mLogin) {
    this.isLoginShown = false;
    this.isCreateShown = false;
    this.isLoadShown = true;
    this.loginSvc.doLogin(mLogin).subscribe(res => {
      const loginResponse: MResponseDefault = res;
      if (loginResponse.status === 'success') {
        this.webStoreSvc.setJson(TblUsers.USER_KEY, mLogin.email);
        console.log(res);
        this.router.navigate(['/user/dashboard']);
      }
    }, err => {
      console.log(err);
      this.isLoginShown = true;
      this.isCreateShown = true;
      this.isLoadShown = false;
      const dialogRef = this.dialog.open(LoginMatDialogComponent, {
        width: 'auto',
        data: {title: 'Login Error', message: 'Username or Password may be Incorrect!'}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.message = result;
      });
    });
  }

  createLink() {
    this.router.navigate(['/create-account']);
  }
}

@Component({
  selector: 'app-login-mat-dialog',
  templateUrl: './login-mat-dialog.html',
  styleUrls: ['./login-mat-dialog.scss']
})
export class LoginMatDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
