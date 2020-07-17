import { AddressInfo } from "net";

export type NetworkOnError = (err: Error) => void;
export type NetworkOnMessage = (msg: Buffer, rinfo: AddressInfo) => void;
export type NetWorkOnListen = () => Promise<void>;

export type NetworkSend = (payload: string) => void;
