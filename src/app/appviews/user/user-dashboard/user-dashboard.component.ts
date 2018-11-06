import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {MEthBal} from '../../../shared/models/m-response-ethbal-model';
import {MEthUSD} from '../../../shared/models/m-response-ethusd-model';
import { MPayout } from 'src/app/shared/models/m-payout-model';
import { MUser } from 'src/app/shared/models/m-user.model';
import { MCreatePay } from 'src/app/shared/models/m-createPay-model';
import { MResponseCreatePay } from 'src/app/shared/models/m-response-createPay-model';
import { environment } from '../../../../environments/environment';
import { MWalletsModel } from 'src/app/shared/models/m-wallets.model';
import { MCreateWalletPay } from 'src/app/shared/models/m-createWalletPay-model';
import { MCreateWalletSell } from 'src/app/shared/models/m-createWalletSell-model';

export interface Curr {
  value: string;
  view: string;
}
export interface Wall {
  value: string;
  view: string;
}
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  expected = 0;
  balance: string;
  userEmail: string;
  current: string;
  valueCurr = 'ETH';
  isLoadShown = false;
  form1 = true;
  form2 = false;
  form3 = true;
  disableSelect = new FormControl(false);
  wallets: MWalletsModel[];
  wall: Wall[];
  curr: Curr[] = [
    {value: 'PAYP', view: 'Buy ETH using PayPal'},
    {value: 'FIAT', view: 'Buy ETH using Wallet'},
    {value: 'ETHP', view: 'ETH to Paypal'},
    {value: 'ETHF', view: 'ETH to Wallet'}
  ];
  usd: number;
  mPayout = new MPayout();
  mCreatePay = new MCreatePay({
    currency: 'USDP'
  });
  expwalletType: string;
  expwalletName: string;
  expbalance = '0';
  expsymbol = 'USD';
  constructor(
    private usrSrv: UserService
  ) { }

  ngOnInit() {
    this.userEmail = this.usrSrv.getCurrentUser();
    this.initComp();
  }

  initComp() {
    this.usrSrv.getDetails(this.userEmail).subscribe(res => {
      const result = res.result;
      const user: MUser = result.User[0];
      this.wall = [];
      this.wallets = result.Wallet;
      this.expwalletType = this.wallets[0].walletType;
      this.expwalletName = this.wallets[0].walletName;
      this.expbalance = this.wallets[0].balance;
      this.expsymbol = this.wallets[0].symbol;
      this.wallets.forEach(item => {
        this.wall.push({ value: item.walletType, view: item.walletName});
      });
      this.mPayout.receiver = user.paypalEmail;
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
    if (this.mCreatePay.currency === 'PAYP') {
      mCreatePay.currency = 'USD';
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
    } else if (this.mCreatePay.currency === 'FIAT') {
      this.current = 'Processing Payment to Ether';
      const form = new MCreateWalletPay({
        amount: mCreatePay.amount,
        walletType: this.expwalletType,
        email: this.userEmail,
        symbol: this.expsymbol
      });
      console.log(form);
      this.usrSrv.createWalletPay(form).subscribe(res => {
        this.initComp();
        this.isLoadShown = false;
        this.form1 = true;
        alert('Success');
        console.log(res);
      }, err => {
        console.log(err);
      });
    } else if (this.mCreatePay.currency === 'ETHF') {
      this.current = 'Processing Payment to Ether';
      const form = new MCreateWalletSell({
        amount: mCreatePay.amount,
        walletType: this.expwalletType,
        email: this.userEmail,
        symbol: this.expsymbol
      });
      console.log(form);
      this.usrSrv.createWalletSell(form).subscribe(res => {
        this.initComp();
        this.isLoadShown = false;
        this.form1 = true;
        alert('Success');
        console.log(res);
      }, err => {
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
        this.initComp();
      }, err => {
        this.isLoadShown = false;
        this.form1 = true;
        console.log(err);
      });
    }
  }

  onChange() {
    for (let c = 0; c < this.wallets.length; c++) {
      if (this.wallets[c].walletName === this.expwalletName) {
        this.expwalletType = this.wallets[c].walletType;
        this.expbalance = this.wallets[c].balance;
        this.expsymbol = this.wallets[c].symbol;
        console.log(this.wallets);
        console.log('Name: ' + this.expwalletName + ' Balance: ' + this.expbalance + ' Symbol: ' + this.expsymbol);
      }
    }
  }

  onKeyup() {
    const event = parseFloat(this.mCreatePay.amount);
    if (this.mCreatePay.currency === 'PAYP' || this.mCreatePay.currency === 'FIAT') {
      this.valueCurr = 'ETH';
      this.expected = event / this.usd;
      if (this.mCreatePay.currency === 'PAYP') {
        this.disableSelect = new FormControl(true);
      } else {
        this.disableSelect = new FormControl(false);
      }
    } else {
      this.valueCurr = 'USD';
      this.expected = event / (1 / this.usd);
      if (this.mCreatePay.currency === 'ETHP') {
        this.disableSelect = new FormControl(true);
      } else {
        this.disableSelect = new FormControl(false);
      }
    }
  }

}
