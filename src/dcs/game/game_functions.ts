import { send } from "../main";
import Callback from "../dispatcher/types/callback";

export const execute = (name: string, args: {[key:string]: string | number | boolean}, callback: Callback) => {
  send(
    {
      name,
      args
    },
    callback,
    "function"
  );
};
