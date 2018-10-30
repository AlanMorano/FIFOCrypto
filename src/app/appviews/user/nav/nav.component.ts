import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from '../../../shared/services/user.service';
import { MUser } from 'src/app/shared/models/m-user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  fname: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private usrSrv: UserService
    ) {
    }

  ngOnInit() {
    const userEmail = this.usrSrv.getCurrentUser();
    console.log(userEmail);
    this.usrSrv.getDetails(userEmail).subscribe(res => {
      // const user: MUser = res.result[0];
      // this.fname = user.FirstName;
      // console.log(this.fname, user);
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.usrSrv.getEtherBal(userEmail).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
