import { send } from "../main";
import Callback from "../dispatcher/types/callback";

const addTrigger = (
  type: string,
  groupName: string,
  zoneName: string,
  frequency: "once" | "repeat",
  callback: Callback
) => {
  send(
    {
      frequency,
      type,
      groupName,
      zoneName
    },
    callback,
    "trigger"
  );
};

export { addTrigger };
