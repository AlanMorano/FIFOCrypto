import { Component, OnInit, Inject } from '@angular/core';
import {MEthBal} from '../../../shared/models/m-response-ethbal-model';
import {MEthUSD} from '../../../shared/models/m-response-ethusd-model';
import { MTransfer } from 'src/app/shared/models/m-transfer-model';
import {UserService} from '../../../shared/services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  title: string;
  message: string;
  mTransfer = new MTransfer();
  userEmail: string;
  balance: string;
  usd: number;
  eur: number;
  isLoadShown = false;
  form1 = true;
  constructor(
    public dialog: MatDialog,
    private usrSrv: UserService
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


  transfer(mTransfer: MTransfer) {
    mTransfer.from = this.userEmail;
    this.isLoadShown = true;
    this.form1 = false;
    this.usrSrv.transfer(mTransfer).subscribe(res => {
      console.log(res);
      this.usrSrv.getEtherBal(this.userEmail).subscribe(res1 => {
        const result: MEthBal = res1.result;
        this.balance = result.ether;
      }, err => {
        console.log(err);
      });
      const dialogRef = this.dialog.open(TransferMatDialogComponent, {
        width: 'auto',
        data: {
          title: 'Ether Successfully Transferred',
          message: 'Will refresh balance counter'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.message = result;
      });
      this.isLoadShown = true;
      this.form1 = false;
    }, err => {
      console.log(err);
    });
  }
}

@Component({
  selector: 'app-transfer-mat-dialog',
  templateUrl: './transfer-mat-dialog.html',
  styleUrls: ['./transfer-mat-dialog.scss']
})
export class TransferMatDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TransferMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
