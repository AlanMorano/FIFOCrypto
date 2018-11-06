export class MPayout {
  value: number;
  from: string;
  receiver: string;

  constructor(init?: Partial<MPayout>) {
    Object.assign(this, init);
  }
}
