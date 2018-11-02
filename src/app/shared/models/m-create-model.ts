export class MCreate {
  lastName: string;
  firstName: string;
  email: string;
  paypalEmail: string;
  password: string;

  constructor(init?: Partial<MCreate>) {
    Object.assign(this, init);
  }
}
