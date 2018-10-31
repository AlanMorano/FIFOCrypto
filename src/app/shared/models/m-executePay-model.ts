export class MExecutePay {
  id: string;
  payerId: string;

  constructor(init?: Partial<MExecutePay>) {
    Object.assign(this, init);
  }
}
