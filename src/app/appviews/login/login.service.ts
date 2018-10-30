import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WebStorageService} from '../../shared/services/web-storage.service';
import {MLogin} from '../../shared/models/m-login.model';
import {environment} from '../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {MResponseDefault} from '../../shared/models/m-response-default.model';
import {TblUsers} from '../../tempDB/tbl-users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private webStore: WebStorageService
    ) {
    }

  public doLogin(login: MLogin): Observable<MResponseDefault> {
    if (environment.production) {
      return this.doLoginProd(login);
    } else {
      return this.doLoginDev(login);
    }
  }

  private doLoginProd(login: MLogin): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpLogin = this.http.post<MResponseDefault>('/api/login', login, {headers: headers});
    console.log('http login', httpLogin, login);
    return httpLogin;
  }

  private doLoginDev(login: MLogin): Observable<MResponseDefault> {
    const usernameIndex = this.getUsernameIndex(login.email);
    let response = new Observable<MResponseDefault>();

    if (usernameIndex !== -1) {
      if (TblUsers.data[usernameIndex].password === login.password) {
        response = of(new MResponseDefault({
          status: 'success',
          message: 'User successfully logged in.',
          result: [{EmailAddress: 'abmorano11@gmail.com'}]
        }));
      } else {
        response = throwError(new MResponseDefault({
          status: 'error',
          message: 'Incorrect email or password.',
          result: {status: 'failed'}
        }));
      }
    } else {
      response = throwError(new MResponseDefault({
        status: 'error dev',
        message: 'User does not exist on the server.',
        result: {status: 'Error'}
      }));
    }

    return response;
  }

  private getUsernameIndex(username: string) {
    let index = 0;
    let usernameIndex = -1;
    TblUsers.data.map(user => {
      if (user.EmailAddress === username) {
        usernameIndex = index;
      }
      index++;
    });

    return usernameIndex;
  }
}
