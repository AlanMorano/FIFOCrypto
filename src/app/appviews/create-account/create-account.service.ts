import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WebStorageService} from '../../shared/services/web-storage.service';
import {MCreate} from '../../shared/models/m-create-model';
import {environment} from '../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {MResponseDefault} from '../../shared/models/m-response-default.model';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(
    private http: HttpClient,
    private webStore: WebStorageService
    ) {
    }

  public createAccount(create: MCreate): Observable<MResponseDefault> {
    if (environment.production) {
      return this.createAccountProd(create);
    } else {
      return this.createAccountDev(create);
    }
  }

  private createAccountProd(create: MCreate): Observable<MResponseDefault> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const httpCreate = this.http.post<MResponseDefault>('/api/createAccount', create, {headers: headers});
    console.log('http create', httpCreate, create);
    return httpCreate;
  }

  private createAccountDev(create: MCreate): Observable<MResponseDefault> {
    let response = new Observable<MResponseDefault>();
    response = of(new MResponseDefault({
      status: 'Dev success Changes will not reflect',
      message: 'User successfully registered in.',
      result: {status: 'success'}
    }));
    return response;
  }
}
