export class MWalletsModel {
    id: number;
    walletName: string;
    walletType: string;
    publicAddress: string;
    privateAddress: string;
    balance: string;
    symbol: string;
    email: string;

  constructor(init?: Partial<MWalletsModel>) {
    Object.assign(this, init);
  }
}
