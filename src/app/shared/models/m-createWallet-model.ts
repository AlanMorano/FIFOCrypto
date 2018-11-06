export class MCreateWallet {
  walletType: string;
  walletName: string;
  symbol: string;
  balance: string;
  email: string;

  constructor(init?: Partial<MCreateWallet>) {
    Object.assign(this, init);
  }
}
