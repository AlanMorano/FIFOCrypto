import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {TblUsers} from '../../tempDB/tbl-users';
import {WebStorageService} from './web-storage.service';
import {MResponseDefault} from '../models/m-response-default.model';
import { MExchange } from '../models/m-exchange-model';
import { MTransfer } from '../models/m-transfer-model';
import { MCreatePay } from '../models/m-createPay-model';
import { MExecutePay } from '../models/m-executePay-model';
import { MPayout } from '../models/m-payout-model.1';

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
    const httpDetails = this.http.get<MResponseDefault>('/api/getUserDetailsByEmail?email=' + emailAddress);
    return httpDetails;
  }

  public getEtherBal(emailAddress): Observable<MResponseDefault> {
    const httpEthBal = this.http.get<MResponseDefault>('/api/getEtherBalance?email=' + emailAddress);
    return httpEthBal;
  }
  public getEtherToUsd(): Observable<MResponseDefault> {
    const httpEthUSD = this.http.get<MResponseDefault>('/api/checkUSDTOETHER');
    return httpEthUSD;
  }

  public createPay(form: MCreatePay): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpCreatePay = this.http.post<MResponseDefault>('/api/createPayment', form, {headers: headers});
    return httpCreatePay;
  }

  public executePay(form: MExecutePay): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpExecutePay = this.http.post<MResponseDefault>('/api/executePayment', form, {headers: headers});
    return httpExecutePay;
  }

  public exchange(form: MExchange): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpExchange = this.http.post<MResponseDefault>('/api/exchange', form, {headers: headers});
    return httpExchange;
  }

  public transfer(form: MTransfer): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpTransfer = this.http.post<MResponseDefault>('/api/walletToWallet', form, {headers: headers});
    return httpTransfer;
  }

  public payout(form: MPayout): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpTransfer = this.http.post<MResponseDefault>('/api/createPayout', form, {headers: headers});
    return httpTransfer;
  }
}
