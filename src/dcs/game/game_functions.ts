import { send } from "../main";
import Callback from "../dispatcher/types/callback";

const spawnGroup = (groupName: string, callback: Callback) => {
  send(
    {
      name: "spawnInZone",
      args: {
        groupName
      }
    },
    callback
  );
};

const spawnGroupInZone = (
  groupName: string,
  zoneName: string,
  callback: Callback,
  randomize?: boolean
) => {
  send(
    {
      name: "spawnInZone",
      args: {
        groupName,
        zoneName,
        randomize: randomize || true
      }
    },
    callback
  );
};

export { spawnGroup, spawnGroupInZone };
