import ToBeDispatched from "./dispatcher/types/to_be_dispatched";

const dataFromDcsJsonToObject = (data: string): { [key: string]: string } => {
  return JSON.parse(data);
};

const validatePayload = (data: { [key: string]: any }) => {
  return new Promise<ToBeDispatched>((resolve, reject) => {
    if (data && data.type && data.data && data.callbackId) {
      const outputPayload: ToBeDispatched = {
        data: data.data,
        callbackId: data.callbackId,
        type: data.type
      };
      resolve(outputPayload);
    } else reject("Couldn't validate payload");
  });
};

const payload_validator = {
  dataFromDcsJsonToObject: dataFromDcsJsonToObject,
  validatePayload: validatePayload
};
export default payload_validator;
