import ToBeDispatched from "./dispatcher/types/to_be_dispatched";

const dataFromDcsJsonToObject = (data: string): { [key: string]: string } => {
  return JSON.parse(data);
};

const validatePayload = (data: { [key: string]: any }): ToBeDispatched => {
  if (data && data.type && data.data && data.callbackId) {
    const outputPayload: ToBeDispatched = {
      data: data.data,
      callbackId: data.callbackId,
      type: data.type
    };
    return outputPayload;
  } else throw Error("Couldn't validate payload");
};
export { validatePayload, dataFromDcsJsonToObject };
