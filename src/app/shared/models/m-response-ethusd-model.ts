export class MEthUSD {
  ETH: number;
  USD: number;
  EUR: number;

  constructor(init?: Partial<MEthUSD>) {
    Object.assign(this, init);
  }
}
