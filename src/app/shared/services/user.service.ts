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
import { MPayout } from '../models/m-payout-model';
import { MResponseUsers } from '../models/m-response-users.model';
import { MCreateWallet } from '../models/m-createWallet-model';
import { MCreateWalletPay } from '../models/m-createWalletPay-model';
import { MCreateWalletSell } from '../models/m-createWalletSell-model';

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

  public getDetails(emailAddress): Observable<MResponseUsers> {
    const httpDetails = this.http.get<MResponseUsers>('/api/getUserDetailsByEmail?email=' + emailAddress);
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

  public createWallet(form: MCreateWallet): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpCreateWallet = this.http.post<MResponseDefault>('/api/createWallet', form, {headers: headers});
    return httpCreateWallet;
  }

  public createWalletPay(form: MCreateWalletPay): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpCreateWalletPay = this.http.post<MResponseDefault>('/api/buyViaOtherWallet', form, {headers: headers});
    return httpCreateWalletPay;
  }

  public createWalletSell(form: MCreateWalletSell): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpCreateWalletSell = this.http.post<MResponseDefault>('/api/sellViaOtherWallet', form, {headers: headers});
    return httpCreateWalletSell;
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
