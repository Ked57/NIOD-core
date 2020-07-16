import { initNetwork } from "./network";
import { NetworkOnError, NetworkOnMessage } from "./types/network_types";
import { mutate, mutationNames } from "./store/mutation";
import { sendMessage, createMessage, handleMessage } from "./message";
import { isMesssage } from "./types/message_types";
import {
  addEventHandler,
  EventPlayerEnterUnit,
  removeEventHandler,
  EVENTS,
  EventKill
} from "./dcs/event";
import { getGroups, getUnits } from "./dcs/functions";

const config = {
  ownPort: 15487,
  distantPort: 15488
};

const networkOnError: NetworkOnError = async err => {
  const [server, networkSend] = await initNetwork(
    config.ownPort,
    config.distantPort,
    networkOnError,
    networkOnMessage
  );
  mutate(mutationNames.SET_SERVER, { server });
  mutate(mutationNames.SET_NETWORK_SEND, { networkSend });
  console.log("NIOD server successfuly loaded after crashing");
};

const networkOnMessage: NetworkOnMessage = (msg, rinfo) => {
  const payload = JSON.parse(msg.toString());
  if (!isMesssage(payload)) {
    console.error(
      `ERROR: received invalid message from ${rinfo.address}:${rinfo.port}`
    );
    return;
  }
  handleMessage(payload);
};

export const initNiod = async () => {
  const [server, networkSend] = await initNetwork(
    config.ownPort,
    config.distantPort,
    networkOnError,
    networkOnMessage
  );
  mutate(mutationNames.SET_SERVER, { server });
  mutate(mutationNames.SET_NETWORK_SEND, { networkSend });
  console.log("NIOD server successfuly loaded");
};

initNiod().then(async () => {
  setInterval(async () => {
    let groupsWithUnits: any[] = [];
    await Promise.all(
      (await getGroups(1)).map(async group =>
        groupsWithUnits.push({
          ...group,
          units: await getUnits(group.name)
        })
      )
    );
    console.log("groups", groupsWithUnits);

    let groupsWithUnits2: any[] = [];
    await Promise.all(
      (await getGroups(2)).map(async group =>
        groupsWithUnits.push({
          ...group,
          units: await getUnits(group.name)
        })
      )
    );
    console.log("groups2", groupsWithUnits2);
  }, 2500);

  addEventHandler(EVENTS.EventKill, (payload: EventKill) =>
    console.log("Player was killed", payload)
  );
});
