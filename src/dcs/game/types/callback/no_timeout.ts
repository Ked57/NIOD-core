import Callback from "../../../dispatcher/types/callback";

type NoTimeout = {
  type: string;
  data: { [key: string]: any };
  callbackId: string;
  callback?: Callback;
};

export default NoTimeout;
