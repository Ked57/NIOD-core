export type MessageTypeFunction = "function";

export type MessageTypeEvent = "event";

export type MessageTypeReceived = "received";

export type MessageType =
  | MessageTypeFunction
  | MessageTypeEvent
  | MessageTypeReceived;

export type Message = {
  id: string;
  type: MessageType;
  callbackId: string | undefined;
  payload: { [key: string]: string | boolean | number };
  sent: number;
};

export const isMessageTypeFunction = (input: any): input is MessageTypeFunction =>
  input === "function";
export const isMessageTypeEvent = (input: any): input is MessageTypeEvent =>
  input === "event";
export const isMessageTypeReceived = (input: any): input is MessageTypeReceived =>
  input === "received";

export const isMessageType = (input: any): input is MessageType =>
  isMessageTypeFunction(input) ||
  isMessageTypeEvent(input) ||
  isMessageTypeReceived(input);

export const isMesssage = (data: { [key: string]: any }): data is Message =>
  typeof data === "object" &&
  data !== null &&
  typeof data.id === "string" &&
  isMessageType(data.type) &&
  typeof data.payload === "object" &&
  typeof data.sent === "number";
