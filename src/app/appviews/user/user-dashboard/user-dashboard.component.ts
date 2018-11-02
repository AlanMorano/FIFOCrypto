import { Component, OnInit, isDevMode } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {MEthBal} from '../../../shared/models/m-response-ethbal-model';
import {MEthUSD} from '../../../shared/models/m-response-ethusd-model';
import { MPayout } from 'src/app/shared/models/m-payout-model.1';
import { MUser } from 'src/app/shared/models/m-user.model';
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
  current: string;
  curr: Curr[] = [
    {value: 'USD', view: 'USD to ETH'},
    {value: 'ETH', view: 'ETH to USD'}
  ];
  valueCurr = 'ETH';
  usd: number;
  mPayout = new MPayout();
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
    this.usrSrv.getDetails(this.userEmail).subscribe(res => {
      const result: MUser[] = res.result;
      console.log(result[0].paypalEmail);
      this.mPayout.receiver = result[0].paypalEmail;
    }, err => {
      console.log(err);
    });
    this.usrSrv.getEtherBal(this.userEmail).subscribe(res => {
      const result: MEthBal = res.result;
      this.balance = result.ether;
    }, err => {
      console.log(err);
    });
    this.usrSrv.getEtherToUsd().subscribe(res => {
      const result: MEthUSD = res.result;
      this.usd = result.USD;
    }, err => {
      console.log(err);
    });
  }

  createPay(mCreatePay: MCreatePay) {
    this.form1 = false;
    this.isLoadShown = true;
    if (this.mCreatePay.currency === 'USD') {
      this.current = 'Processing Payment to Ether';
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
    } else {
      this.current = 'Processing Ether to be converted to USD';
      this.mPayout.from = this.userEmail;
      this.mPayout.value = parseFloat(mCreatePay.amount);
      console.log(this.mPayout);
      this.usrSrv.payout(this.mPayout).subscribe(res => {
        console.log(res);
        this.isLoadShown = false;
        this.form1 = true;
        this.usrSrv.getEtherBal(this.userEmail).subscribe(res1 => {
          const result: MEthBal = res1.result;
          this.balance = result.ether;
        }, err => {
          console.log(err);
        });
      }, err => {
        this.isLoadShown = false;
        this.form1 = true;
        console.log(err);
      });
    }
  }

  onkeyup() {
    const event = parseFloat(this.mCreatePay.amount);
    if (this.mCreatePay.currency === 'USD') {
      this.valueCurr = 'ETH';
      this.expected = event / this.usd;
    } else {
      this.valueCurr = 'USD';
      this.expected = event / (1 / this.usd);
    }
  }

}
