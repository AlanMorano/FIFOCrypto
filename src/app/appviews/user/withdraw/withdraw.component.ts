import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {MEthBal} from '../../../shared/models/m-response-ethbal-model';
import { MUser } from 'src/app/shared/models/m-user.model';
import { MPayout } from 'src/app/shared/models/m-payout-model.1';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  title: string;
  message: string;
  mPayout = new MPayout();
  userEmail: string;
  balance: string;
  isLoadShown = false;
  form = true;
  constructor(
    private usrSrv: UserService
    ) { }

  ngOnInit() {
    this.userEmail = this.usrSrv.getCurrentUser();
    this.usrSrv.getDetails(this.userEmail).subscribe(res => {
      const result: MUser = res.result;
      this.mPayout.receiver = result.paypalEmail;
    }, err => {
      console.log(err);
    });
    this.usrSrv.getEtherBal(this.userEmail).subscribe(res => {
      const result: MEthBal = res.result;
      this.balance = result.ether;
    }, err => {
      console.log(err);
    });
  }

  payout(mPayout: any) {
    mPayout.receiver = this.mPayout.receiver;
    this.usrSrv.payout(mPayout).subscribe(res => {
      console.log(res);
      this.usrSrv.getEtherBal(this.userEmail).subscribe(res1 => {
        const result: MEthBal = res1.result;
        this.balance = result.ether;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

}
