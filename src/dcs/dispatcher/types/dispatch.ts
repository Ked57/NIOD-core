import Callback from "./callback";

type Dispatch = {
  data: { [key: string]: any };
  callback: Callback;
  callbackId: string;
};

export default Dispatch;
