export default interface ToBeDispatched {
  data: { [key: string]: any };
  callbackId: string;
  type: string;
}
