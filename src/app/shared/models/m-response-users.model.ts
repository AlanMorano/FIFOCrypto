import {MUser} from './m-user.model';

export class MResponseUsers {
  message: string;
  users: Array<MUser>;
  status: string;

  constructor(init?: Partial<MResponseUsers>) {
    Object.assign(this, init);
  }
}
