import Callback from "../../../dispatcher/types/callback";

type Function = {
  type: string;
  data: { [key: string]: any };
  callbackId: string;
  callback?: Callback;
};

export default Function;
