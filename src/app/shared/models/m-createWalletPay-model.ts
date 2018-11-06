export class MCreateWalletPay {
  amount: string;
  walletType: string;
  symbol: string;
  email: string;

  constructor(init?: Partial<MCreateWalletPay>) {
    Object.assign(this, init);
  }
}
