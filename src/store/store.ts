import { Store } from "../types/store_types";
import { Callback } from "../types/dispatch_types";

export const store: Store = {
  sentMessages: [],
  receivedMessages: [],
  callbacks: new Map<string, Callback>(),
  server: undefined,
  networkSend: undefined
};

export const getStore = (): Readonly<Store> => store;
