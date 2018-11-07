import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

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
