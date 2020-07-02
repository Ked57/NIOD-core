import { Store } from "../types/store";

export const store: Store = {
  sentMessages: [],
  receivedMessages: [],
  server: undefined,
  networkSend: undefined,
};

export const getStore = ():Readonly<Store> => store 