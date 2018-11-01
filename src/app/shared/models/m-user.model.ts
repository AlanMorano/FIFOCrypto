export class MUser {
  id: number;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  password: string;
  PrivateAddress: string;
  PublicAddress: string;
  paypalEmail: string;

  constructor(init?: Partial<MUser>) {
    Object.assign(this, init);
  }
}
