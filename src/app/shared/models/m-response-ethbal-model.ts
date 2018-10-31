export class MEthBal {
  address: string;
  symbol: string;
  ether: string;

  constructor(init?: Partial<MEthBal>) {
    Object.assign(this, init);
  }
}
