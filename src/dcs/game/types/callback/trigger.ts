import Callback from "../../../dispatcher/types/callback";

type Trigger = {
  type: string;
  data: { [key: string]: any };
  callbackId: string;
  callback?: Callback;
};

export default Trigger;
