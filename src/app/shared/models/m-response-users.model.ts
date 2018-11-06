import {MUser} from './m-user.model';
import { MWalletsModel } from './m-wallets.model';

export class MResponseUsers {
  message: string;
  result: {
    User: Array<MUser>,
    Wallet: Array<MWalletsModel>
  };
  status: string;

  constructor(init?: Partial<MResponseUsers>) {
    Object.assign(this, init);
  }
}
