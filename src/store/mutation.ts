import { Socket } from "dgram";
import { store } from "./store";
import { NetworkSend } from "../types/network_types";
import { Mutate } from "../types/store_types";
import { Message } from "../types/message_types";
import { Callback } from "../types/dispatch_types";

export const mutate: Mutate = (mutationName, args) =>
  mutations[mutationName](args);

export const mutationNames = {
  SET_SERVER: "setServer",
  SET_NETWORK_SEND: "setNetworkSend",
  SET_SENT_MESSAGES: "setSentMessages",
  SET_RECEIVED_MESSAGES: "setReceivedMessage",
  SET_CALLBACKS: "setCallbacks"
};

const mutations = {
  [mutationNames.SET_SERVER]: ({ server }: { server: Socket }) =>
    (store.server = server),
  [mutationNames.SET_NETWORK_SEND]: ({
    networkSend
  }: {
    networkSend: NetworkSend;
  }) => (store.networkSend = networkSend),
  [mutationNames.SET_SENT_MESSAGES]: ({
    sentMessages
  }: {
    sentMessages: Message[];
  }) => {
    store.sentMessages = sentMessages;
  },
  [mutationNames.SET_RECEIVED_MESSAGES]: ({
    receivedMessages
  }: {
    receivedMessages: Message[];
  }) => {
    store.receivedMessages = receivedMessages;
  },
  [mutationNames.SET_CALLBACKS]: ({
    callbacks
  }: {
    callbacks: Map<string, Callback>;
  }) => {
    store.callbacks = callbacks;
  }
};
