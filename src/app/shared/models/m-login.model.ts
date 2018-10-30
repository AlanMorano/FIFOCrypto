export class MLogin {
  email: string;
  password: string;

  constructor(init?: Partial<MLogin>) {
    Object.assign(this, init);
  }
}

