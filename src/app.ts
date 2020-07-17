import { initNetwork } from "./network";
import { NetworkOnError, NetworkOnMessage } from "./types/network_types";
import { mutate, mutationNames } from "./store/mutation";
import { handleMessage } from "./message";
import { isMesssage } from "./types/message_types";
import { getGroups, getUnits } from "./dcs/functions";
import { getStore } from "./store/store";

const networkOnError: NetworkOnError = async err => {
  const store = getStore();
  const [server, networkSend] = await initNetwork(
    store.config.ownPort,
    store.config.distantPort,
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

/**
 * @param ownPort  To specify a custom port for the nodejs server, default is 15487
 * @param distantPort  To specify a custom port for the lua server, default is 15488
 */
export const initNiod = async (ownPort?: number, distantPort?: number) => {
  const initialStateStore = getStore();
  mutate(mutationNames.SET_CONFIG, {
    ownPort: ownPort || initialStateStore.config.ownPort,
    distantPort: distantPort || initialStateStore.config.distantPort
  });
  const store = getStore();
  const [server, networkSend] = await initNetwork(
    store.config.ownPort,
    store.config.distantPort,
    networkOnError,
    networkOnMessage
  );
  mutate(mutationNames.SET_SERVER, { server });
  mutate(mutationNames.SET_NETWORK_SEND, { networkSend });
  console.log(`NIOD server successfuly loaded on port ${store.config.ownPort}`);
};

export { getGroups, getUnits };
