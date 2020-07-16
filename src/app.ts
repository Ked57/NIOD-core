import { of } from "await-of";
import { initNetwork } from "./network";
import { NetworkOnError, NetworkOnMessage } from "./types/network_types";
import { mutate, mutationNames } from "./store/mutation";
import { sendMessage, createMessage, handleMessage } from "./message";
import { isMesssage } from "./types/message_types";
import {
  addEventHandler,
  EventPlayerEnterUnit,
  removeEventHandler,
  EVENTS
} from "./dcs/event";

const config = {
  ownPort: 15487,
  distantPort: 15488
};

const networkOnError: NetworkOnError = err => {
  initNetwork(
    config.ownPort,
    config.distantPort,
    networkOnError,
    networkOnMessage
  ).then(([server, networkSend]) => {
    mutate(mutationNames.SET_SERVER, { server });
    mutate(mutationNames.SET_NETWORK_SEND, { networkSend });
    console.log("NIOD server successfuly loaded");
  });
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

initNiod().then(() => {
  addEventHandler(
    EVENTS.EventPlayerEnterUnit,
    (payload: EventPlayerEnterUnit) => {
      console.log("Welcome, new player !", payload);
    }
  );
});
