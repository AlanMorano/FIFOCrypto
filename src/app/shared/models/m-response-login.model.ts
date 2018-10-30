export class MLoginResponse {
  message: string;
  status: string;
  result: any;

  constructor(init?: Partial<MLoginResponse>) {
    Object.assign(this, init);
  }
}
