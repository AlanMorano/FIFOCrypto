import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from '../../shared/services/user.service';
import { MUser } from 'src/app/shared/models/m-user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.scss']
})
export class LayoutUserComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  fname: string;
  pubAdd: string;
  priAdd: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private usrSrv: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    const userEmail = this.usrSrv.getCurrentUser();
    this.usrSrv.getDetails(userEmail).subscribe(res => {
      const user: MUser = res.result[0];
      this.fname = user.FirstName;
      this.pubAdd = user.PublicAddress;
      this.priAdd = user.PrivateAddress;
    }, err => {
      console.log(err);
    });
  }


  routeDash() {
    this.router.navigate(['/user/dashboard']);
  }

  routeCout() {
    this.router.navigate(['/user/transfer']);
  }
}
