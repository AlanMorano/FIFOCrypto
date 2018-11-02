import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {MEthBal} from '../../../shared/models/m-response-ethbal-model';
import {MEthUSD} from '../../../shared/models/m-response-ethusd-model';
import {MExchange} from '../../../shared/models/m-exchange-model';
import { MExecutePay } from 'src/app/shared/models/m-executePay-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MResponseExecutePay } from 'src/app/shared/models/m-response-executePay-model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  title: string;
  message: string;
  current: string;
  balance: string;
  userEmail: string;
  usd: number;
  mExecutePay = new MExecutePay();
  mExchange = new MExchange();
  isLoadShown = true;
  constructor(
    private usrSrv: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
    ) {
    }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      console.log(res);
      this.current = 'Executing Payment';
      this.mExecutePay.id = res.paymentId;
      this.mExecutePay.payerId = res.PayerID;
      this.executePay(this.mExecutePay);
    }, err => {
      console.log(err);
    });
    this.userEmail = this.usrSrv.getCurrentUser();
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

  executePay(mExecutePay: MExecutePay) {
    this.usrSrv.executePay(mExecutePay).subscribe(res => {
      console.log(res);
      this.current = 'Exchanging Payment Amount to Eth';
      const data: MResponseExecutePay = res.result;
      this.mExchange.amount = parseFloat(data.transactions[0].amount.total);
      console.log(this.mExchange.amount);
      this.exchange(this.mExchange);
    }, err => {
      this.isLoadShown = false;
      console.log(err);
    });
  }

  exchange(mExchange: MExchange) {
    mExchange.email = this.userEmail;
    console.log(mExchange);
    this.usrSrv.exchange(mExchange).subscribe(res => {
      console.log(res);
      this.isLoadShown = false;
      this.usrSrv.getEtherBal(this.userEmail).subscribe(res1 => {
        const result: MEthBal = res1.result;
        this.balance = result.ether;
      }, err => {
        console.log(err);
      });
      const dialogRef = this.dialog.open(CheckoutMatDialogComponent, {
        width: 'auto',
        data: {
          title: 'Successfully Exchanged Ether',
          message: 'Will refresh balance counter, User to User Eth Transfer Form will now be shown'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.message = result;
        this.router.navigate(['/user/transfer']);
      });
    }, err => {
      console.log(err);
    });
  }

}
@Component({
  selector: 'app-checkout-mat-dialog',
  templateUrl: './checkout-mat-dialog.html',
  styleUrls: ['./checkout-mat-dialog.scss']
})
export class CheckoutMatDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CheckoutMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
