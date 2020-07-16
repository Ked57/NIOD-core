import { v4 as uuidv4 } from "uuid";
import {
  Message,
  MessageType
} from "./types/message_types";
import { getStore } from "./store/store";
import { enqueue, removeFromQueue, handleQueue } from "./queue";
import { mutate, mutationNames } from "./store/mutation";
import { Callback } from "./types/dispatch_types";
import { storeCallback, executeCallback } from "./dispatch";
import { handleEvent } from "./dcs/event";

export const sendMessage = (message: Message) => {
  const networkSend = getStore().networkSend;
  if (!networkSend) {
    console.error("Couldn't send message, server is probably not initialized");
    return;
  }
  networkSend(JSON.stringify(message));
  enqueue(message, getStore().sentMessages, (sentMessages: Message[]) =>
    mutate(mutationNames.SET_SENT_MESSAGES, { sentMessages })
  );
 //console.log("Sent", message);
};

export const createMessage = <R>(
  type: MessageType,
  payload: { [key: string]: any },
  callback?: Callback<R>
): Message => {
  return {
    id: uuidv4().toString(),
    type,
    callbackId: storeCallback(callback),
    payload,
    sent: Date.now()
  };
};

const handleFunction = (message: Message) => {};

const handleReceived = (message: Message) => {
  const queuedMessage = removeFromQueue(
    message,
    getStore().sentMessages,
    (sentMessages: Message[]) =>
      mutate(mutationNames.SET_SENT_MESSAGES, { sentMessages })
  );
  if (!queuedMessage) {
    return;
  }
  executeCallback(queuedMessage.callbackId, message.payload);
};

const messageHandlers = {
  function: handleFunction,
  event: (message: Message) => handleEvent(typeof message.payload.id === "number" ? message.payload.id : -1, message.payload),
  received: handleReceived
};

export const handleMessage = (message: Message) => {
  //console.log("Received", message);
  messageHandlers[message.type](message);
};

setInterval(() => {
  handleQueue(
    getStore().sentMessages,
    (sentMessages: Message[]) =>
      mutate(mutationNames.SET_SENT_MESSAGES, { sentMessages }),
    sendMessage
  );
}, 2000);
