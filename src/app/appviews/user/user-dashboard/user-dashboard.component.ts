import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private usrSrv: UserService
  ) { }

  ngOnInit() {
  }

}
