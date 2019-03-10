import { send } from "../main";
import Callback from "../dispatcher/types/callback";
import A2ADispatcher from "./types/data_transfer_objects/a2a_dispatcher";

const addA2ADispatcher = (args: A2ADispatcher, callback: Callback) => {
  send(
    {
      name: "addA2ADispatcher",
      args
    },
    callback,
    "function"
  );
};

export { addA2ADispatcher };
