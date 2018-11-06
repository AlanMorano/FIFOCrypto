import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MCreateWallet } from 'src/app/shared/models/m-createWallet-model';

export interface Type {
  value: string;
}
@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.scss']
})
export class CreateWalletComponent implements OnInit {

  isLoadShown = false;
  form1 = true;
  types: Type[] = [
    {value: 'FIAT'},
    {value: 'CRYPTO'}
  ];
  mCreateWallet = new MCreateWallet({
    walletName: '',
    walletType: '',
    balance: '100',
    symbol: 'USD',
    email: 'asd'
  });
  constructor(
    private usrSrv: UserService
  ) { }

  ngOnInit() {
    this.mCreateWallet.email = this.usrSrv.getCurrentUser();
  }

  createWallet() {
    if (this.mCreateWallet.walletType === 'FIAT') {
      this.mCreateWallet.symbol = 'USD';
    } else {
      this.mCreateWallet.symbol = 'BTC';
    }
    console.log(this.mCreateWallet);
    this.usrSrv.createWallet(this.mCreateWallet).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
