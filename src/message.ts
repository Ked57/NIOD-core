import { v4 as uuidv4 } from "uuid";
import { Message, MessageType, isMessageTypeReceived } from "./types/message";
import { getStore } from "./store/store";
import { enqueue, removeFromQueue, handleQueue } from "./queue";
import { mutate, mutationNames } from "./store/mutation";

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
  payload: { [key: string]: any }
): Message => ({
  id: uuidv4().toString(),
  type,
  callbackId: undefined, // for now, will use the dispatcher later
  payload,
  sent: Date.now()
});

export const handleMessage = (message: Message) => {
  // console.log("Received", message);
  if (isMessageTypeReceived(message.type)) {
    const queuedMessage = removeFromQueue(
      message,
      getStore().sentMessages,
      (sentMessages: Message[]) =>
        mutate(mutationNames.SET_SENT_MESSAGES, { sentMessages })
    );
    // Execute callback if needed
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
