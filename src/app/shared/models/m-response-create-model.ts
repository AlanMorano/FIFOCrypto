export class MCreate {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  password: string;

  constructor(init?: Partial<MCreate>) {
    Object.assign(this, init);
  }
}
