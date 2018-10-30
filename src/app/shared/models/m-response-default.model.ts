export class MResponseDefault {
  message: string;
  status: string;
  result: any;

  constructor(init?: Partial<MResponseDefault>) {
    Object.assign(this, init);
  }
}
