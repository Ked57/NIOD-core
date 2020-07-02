import { Socket } from "dgram";
import { Message } from "./message_types";
import { NetworkSend } from "./network_types";
import { Callback } from "./dispatch_types";

export type Store = {
  sentMessages: Message[];
  receivedMessages: Message[];
  callbacks: Map<string, Callback>;
  server: Socket | undefined;
  networkSend: NetworkSend | undefined;
};

export type Mutate = (mutationName: string, args: any) => void;
