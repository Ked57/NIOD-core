import ToBeDispatched from "./dispatcher/types/to_be_dispatched";

const dataFromDcsJsonToObject = (
  data: string
): { [key: string]: any } | undefined => {
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
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
