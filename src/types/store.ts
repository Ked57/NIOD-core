
import { Socket } from "dgram";
import { Message } from "./message";
import { NetworkSend } from "./network_types";

export type Store = {
    sentMessages: Message[],
    receivedMessages: Message[],
    server: Socket | undefined,
    networkSend: NetworkSend | undefined
}

export type Mutate = (mutationName: string, args: any) => void