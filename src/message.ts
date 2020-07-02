import { v4 as uuidv4 } from "uuid";
import {
  Message,
  MessageType,
  isMessageTypeReceived
} from "./types/message_types";
import { getStore } from "./store/store";
import { enqueue, removeFromQueue, handleQueue } from "./queue";
import { mutate, mutationNames } from "./store/mutation";
import { Callback } from "./types/dispatch_types";
import { storeCallback, executeCallback } from "./dispatch";

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
  // console.log("Sent", message);
};

export const createMessage = (
  type: MessageType,
  payload: { [key: string]: any },
  callback?: Callback
): Message => {
  return {
    id: uuidv4().toString(),
    type,
    callbackId: storeCallback(callback),
    payload,
    sent: Date.now()
  };
};

export const handleMessage = (message: Message) => {
  // console.log("Received", message);
  if (isMessageTypeReceived(message.type)) {
    const queuedMessage = removeFromQueue(
      message,
      getStore().sentMessages,
      (sentMessages: Message[]) =>
        mutate(mutationNames.SET_SENT_MESSAGES, { sentMessages })
    );
    if (!queuedMessage) {
      return;
    }
    executeCallback(queuedMessage.callbackId, queuedMessage.payload);
  }
};

setInterval(() => {
  handleQueue(
    getStore().sentMessages,
    (sentMessages: Message[]) =>
      mutate(mutationNames.SET_SENT_MESSAGES, { sentMessages }),
    sendMessage
  );
}, 2000);
