export class MCreatePay {
  amount: string;
  currency: string;
  successUrl: string;
  cancelUrl: string;

  constructor(init?: Partial<MCreatePay>) {
    Object.assign(this, init);
  }
}
