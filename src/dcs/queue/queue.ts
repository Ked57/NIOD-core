import InputPayload from "../network/types/input_payload";
import { networkSend } from "../network/network_manager";

const queue: InputPayload[] = [];

const enQueue = (payload: InputPayload) => {
  queue.push(payload);
};

const deQueue = (): InputPayload | undefined => {
  return queue.pop();
};

const initQueue = () => {
  setInterval(() => processQueue().map(networkSend), 1000);
};

const processQueue = (): InputPayload[] => {
  const payload = deQueue();
  if (!payload) {
    return [];
  }
  return [...[payload], ...processQueue()];
};

const getQueue = () => queue;

export { initQueue, processQueue, getQueue, enQueue, deQueue };
