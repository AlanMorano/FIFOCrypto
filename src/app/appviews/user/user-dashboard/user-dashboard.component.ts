import { Component, OnInit, isDevMode } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {MEthBal} from '../../../shared/models/m-response-ethbal-model';
import {MEthUSD} from '../../../shared/models/m-response-ethusd-model';
import { MCreatePay } from 'src/app/shared/models/m-createPay-model';
import { MResponseCreatePay } from 'src/app/shared/models/m-response-createPay-model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

export interface Curr {
  value: string;
  view: string;
}
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  expected: number;
  balance: string;
  userEmail: string;
  curr: Curr[] = [
    {value: 'USD', view: 'USD'},
    {value: 'EUR', view: 'EUR'}
  ];
  usd: number;
  eur: number;
  mCreatePay = new MCreatePay({
    currency: 'USD'
  });
  isLoadShown = false;
  form1 = true;
  form2 = false;
  form3 = true;
  constructor(
    private usrSrv: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userEmail = this.usrSrv.getCurrentUser();
    this.usrSrv.getEtherBal(this.userEmail).subscribe(res => {
      const result: MEthBal = res.result;
      this.balance = result.ether;
    }, err => {
      console.log(err);
    });
    this.usrSrv.getEtherToUsd().subscribe(res => {
      const result: MEthUSD = res.result;
      this.eur = result.EUR;
      this.usd = result.USD;
    }, err => {
      console.log(err);
    });
  }

  createPay(mCreatePay: MCreatePay) {
    this.form1 = false;
    this.isLoadShown = true;
    if (!environment.production) {
      mCreatePay.successUrl = 'http://localhost:4200/#/user/checkout';
      mCreatePay.cancelUrl = 'http://localhost:4200/#/user/dashboard';
    } else {
      mCreatePay.successUrl = 'https://fifocrypto.mybluemix.net/#/user/checkout';
      mCreatePay.cancelUrl = 'https://fifocrypto.mybluemix.net/#/user/dashboard';
    }
    console.log(mCreatePay);
    this.usrSrv.createPay(mCreatePay).subscribe(res => {
      this.isLoadShown = false;
      this.form2 = true;
      const data: MResponseCreatePay = res.result;
      console.log(res, data);
      const link = data.links[1].href;
      window.open(link, '_self');
    }, err => {
      this.isLoadShown = false;
      this.form1 = true;
      console.log(err);
    });
  }

  onkeyup() {
    const event = parseFloat(this.mCreatePay.amount);
    if (this.mCreatePay.currency === 'USD') {
      this.expected = event / this.usd;
    } else {
      this.expected = event / this.eur;
    }
  }

}
