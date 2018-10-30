import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TblUsers} from '../../tempDB/tbl-users';
import {WebStorageService} from './web-storage.service';
import {MUser} from '../models/m-user.model';
import {MResponseDefault} from '../models/m-response-default.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private webStore: WebStorageService
  ) {
  }

  public getCurrentUser() {
    return this.webStore.getJson(TblUsers.USER_KEY);
  }

  public getDetails(emailAddress): Observable<MResponseDefault> {
    const httpDetails = this.http.get<MResponseDefault>(
      'https://fifocrypto.mybluemix.net/api/getUserDetailsByEmail/' + emailAddress
      );
    console.log(httpDetails);
    return httpDetails;
  }

  public getEtherBal(emailAddress): Observable<MResponseDefault> {
    const httpEthBal = this.http.get<MResponseDefault>(
      'https://fifocrypto.mybluemix.net/api/getEtherBalance/' + emailAddress);
    console.log(httpEthBal);
    return httpEthBal;
  }
}
