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
    return this.doLoginProd(login);
  }

  private doLoginProd(login: MLogin): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpLogin = this.http.post<MResponseDefault>('/api/login', login, {headers: headers});
    console.log('http login', httpLogin, login);
    return httpLogin;
  }
}
