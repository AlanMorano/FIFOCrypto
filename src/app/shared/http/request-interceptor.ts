import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {WebStorageService} from '../services/web-storage.service';
import {catchError, map, tap} from 'rxjs/operators';
import {TblUsers} from '../../tempDB/tbl-users';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  // api request that are not affected by interceptor
  excludedRequests: any = [
    environment.APIURL + '/login',
    environment.APIURL + '/getUserDetailsByEmail/*'
  ];

  constructor(
    private webStorage: WebStorageService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(' all looks good');
            // http response status code
            console.log(event);
          }
        }, error => {
          // http response status code
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log('Unauthorized request');
              // redirect to the _login route
              // or show a modal
              this.router.navigate(['/login']);
            }
          }
          return of(error);
        })
      );
  }
}
