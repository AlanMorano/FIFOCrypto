export class MAlertModal {
  title: string;
  message: string;
  animationIn: string;
  animationOut: string;
  modalSize: string;
  buttonLabel: string;
  isShown: boolean;

  constructor(init?: Partial<MAlertModal>) {
    Object.assign(this, init);
  }
}
