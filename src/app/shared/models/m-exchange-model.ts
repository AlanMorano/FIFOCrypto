export class MExchange {
  email: string;
  amount: number;

  constructor(init?: Partial<MExchange>) {
    Object.assign(this, init);
  }
}
