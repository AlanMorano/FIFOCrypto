export class MResponseExecutePay {
  id: string;
  intent: string;
  state: string;
  cart: string;
  payer: {
    payment_method: string,
    status: string,
    payer_info: {
      email: string,
      first_name: string,
      last_name: string,
      payer_id: string,
      shipping_address: {
        recipient_name: string,
        line1: string,
        line2: string,
        city: string,
        state: string,
        postal_code: string,
        country_code: string
      },
      country_code: string
    }
  };
  transactions: [
        {
        amount: {
          total: string,
          currency: string,
          details: {}
        },
        payee: {
          merchant_id: string,
          email: string
        },
        item_list: {
          shipping_address: {
            recipient_name: string,
            line1: string,
            line2: string,
            city: string,
            state: string,
            postal_code: string,
            country_code: string
          }
        },
        related_resources: [
          {
            sale: {
              id: string,
              state: string,
              amount: {
                total: string,
                currency: string,
                details: {
                  subtotal: string
                }
              },
              payment_mode: string,
              protection_eligibility: string,
              protection_eligibility_type: string,
              transaction_fee: {
                value: string,
                currency: string
              },
              receipt_id: string,
              parent_payment: string,
              create_time: string,
              update_time: string,
              links: [
                {
                  href: string,
                  rel: string,
                  method: string
                },
                {
                  href: string,
                  rel: string,
                  method: string
                },
                {
                  href: string,
                  rel: string,
                  method: string
                }
              ],
              soft_descriptor: string
            }
          }
        ]
      }
  ];
  create_time: string;
  links: [
    {
      href: string,
      rel: string,
      method: string
    }
  ];

  constructor(init?: Partial<MResponseExecutePay>) {
    Object.assign(this, init);
  }
}
