export default interface DispatchPayload {
  data: { [key: string]: any };
  callbackId: string;
}
