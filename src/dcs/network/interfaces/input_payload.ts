export default interface InputPayload {
  type: string;
  callbackId: string;
  data: { [key: string]: any };
}
