export class MSampleUser {
  firstName: string;
  lastName: string;
  userName: string;
  imageURL: string;
  status: string;

  constructor(init?: Partial<MSampleUser>) {
    Object.assign(this, init);
  }
}
