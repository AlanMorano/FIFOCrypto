export class MPayout {
  value: string;
  receiver: string;

  constructor(init?: Partial<MPayout>) {
    Object.assign(this, init);
  }
}
