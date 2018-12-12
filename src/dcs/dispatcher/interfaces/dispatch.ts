import Callback from "./callback";

export default interface Dispatch {
  data: { [key: string]: any };
  callback: Callback;
  callbackId?: string;
}
