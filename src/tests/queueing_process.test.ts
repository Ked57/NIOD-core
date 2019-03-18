import test from "ava";
import InputPayload from "../dcs/network/types/input_payload";
import { enQueue, deQueue, processQueue, getQueue } from "../dcs/queue/queue";

const modelPayload: InputPayload = {
  type: "function",
  callbackId: "callbackId",
  data: {}
};

test("Given a payload, enQueue it", t => {
  enQueue(modelPayload);
  t.true(getQueue().length > 0);
});

test("deQueue a payload", t => {
  const payload = deQueue();
  t.is(payload, modelPayload);
});

test("Given some payloads, process the queue", t => {
  for (let i = 0; i < 10; ++i) {
    enQueue(modelPayload);
  }
  processQueue((payload: InputPayload) => console.log(payload));
  t.true(getQueue().length <= 0);
});
