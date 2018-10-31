export class MTransfer {
  from: string;
  to: string;
  amount: number;

  constructor(init?: Partial<MTransfer>) {
    Object.assign(this, init);
  }
}
