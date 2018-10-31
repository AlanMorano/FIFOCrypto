export class MResponseCreatePay {
  id: string;
  intent: string;
  state: string;
  payer: {
      payment_method: string
  };
  transactions: [
    {
      amount: {
        total: number
        currency: string
      };
      related_resources: any
    }
  ];
  create_time: string;
  links: [
    {
      href: string
      rel: string
      method: string
    },
    {
      href: string
      rel: string
      method: string
    },
    {
      href: string
      rel: string
      method: string
    }
  ];

  constructor(init?: Partial<MResponseCreatePay>) {
    Object.assign(this, init);
  }
}
