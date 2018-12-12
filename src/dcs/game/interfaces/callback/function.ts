import Callback from "../../../dispatcher/interfaces/callback";

export default interface Function {
  type: string;
  data: { [key: string]: any };
  callbackId: string;
  callback?: Callback;
}
