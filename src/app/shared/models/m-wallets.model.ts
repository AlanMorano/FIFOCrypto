export class MWalletsModel {
  name: string;
  symbol: string;
  walletStatus: string;
  balance: number;

  constructor(init?: Partial<MWalletsModel>) {
    Object.assign(this, init);
  }
}
