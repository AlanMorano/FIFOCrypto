export class MCreateWalletSell {
  amount: string;
  walletType: string;
  symbol: string;
  email: string;

  constructor(init?: Partial<MCreateWalletSell>) {
    Object.assign(this, init);
  }
}
