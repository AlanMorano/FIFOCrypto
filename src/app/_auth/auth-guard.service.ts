import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {WebStorageService} from '../shared/services/web-storage.service';
import {AuthService} from './auth.service';
import {
  of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MUser} from '../shared/models/m-user.model';
import {environment} from '../../environments/environment';
import {TblUsers} from 'src/app/tempDB/tbl-users';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private storage: WebStorageService,
    private authSvc: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const userData = this.storage.getJson(TblUsers.USER_KEY) as MUser;

    if (route.url[0].path !== 'user') {
      this.router.navigate(['/user/dashboard']);
      return true;
    }

    if (environment.production) {
      return true;
    } else {
      return of(true);
    }
  }
}
