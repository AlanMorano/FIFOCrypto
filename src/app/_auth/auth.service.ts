import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MResponseDefault} from '../shared/models/m-response-default.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  checkSession(): Observable<MResponseDefault> {
    return this.http.get<MResponseDefault>('/apiv2/checkSession');
  }

  validateToken(_token: string): Observable<MResponseDefault> {
    return this.http.post<MResponseDefault>('/goldGram/validateToken', {token: _token});
  }
}
