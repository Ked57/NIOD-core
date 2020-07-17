import { Store } from "../types/store_types";
import { Callback } from "../types/dispatch_types";
import { EventHandler } from "../dcs/event";

export const store: Store = {
  config: {
    ownPort: 15487,
    distantPort: 15488
  },
  sentMessages: [],
  receivedMessages: [],
  callbacks: new Map<string, Callback<any>>(),
  server: undefined,
  networkSend: undefined,
  eventHandlers: []
};

export const getStore = (): Readonly<Store> => store;
