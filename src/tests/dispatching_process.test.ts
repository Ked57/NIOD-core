import test from "ava";
import Dispatch from "../dcs/dispatcher/types/dispatch";
import dispatcher from "../dcs/dispatcher/dispatcher";
import payload_validator from "../dcs/payload_validator";
import ToBeDispatched from "../dcs/dispatcher/types/to_be_dispatched";
import DCSModule from "../dcs/main";

const dispatch: Dispatch = {
  callbackId: "testcallbackId",
  callback: () => console.log("it's just a test"),
  data: {
    test: "test data"
  }
};

const functionToBeDispatched: ToBeDispatched = {
  data: {
    test: "test data"
  },
  callbackId: "testcallbackId",
  type: "function"
};

const validReceiveFunc = {
  type: "function",
  data: {
    test: "test data"
  },
  callbackId: "testcallbackId"
};

const validReceiveEvent = {
  type: "event",
  data: { test: "some test data" },
  name: "testevent"
};

const invalidReceiveObject = {
  type: "function",
  callback: "whatever"
};

test("Given an input dispatch, resolve the promise with that same dispatch", async t => {
  t.is(dispatch, await dispatcher.verifiyInputDispatch(dispatch));
});

test("Given a valid input dispatch, add it to the dispatcher's list and resolve the dispatch", async t => {
  t.is(dispatch, await dispatcher.addDispatch(dispatch));
});

test("Given a data object, resolve a 'to be dispatched' object", async t => {
  const toBeDispatched = await payload_validator.validatePayload({
    data: functionToBeDispatched.data,
    callbackId: functionToBeDispatched.callbackId,
    type: functionToBeDispatched.type
  });
  t.deepEqual(functionToBeDispatched, toBeDispatched);
});

test("Given a valid input receive function object, resolve a boolean if you could execute the callback", async t => {
  // Add a dispatch first
  const resultDispatch = await dispatcher.addDispatch(dispatch);
  const validReceiveFuncUpdated = {
    type: validReceiveFunc.type,
    data: validReceiveFunc.data,
    callbackId: resultDispatch.callbackId
  };
  t.is(true, await DCSModule.receive(validReceiveFuncUpdated));
});

test("Given a valid input receive event object, resolve a boolean if you could execute the callback", async t => {
  // events aren't implemented yet
  t.is(true, true);
});

test("Given an invalid input receive function object, resolve a false", async t => {
  // no need to add a dispatcher this time
  t.is(false, await DCSModule.receive(invalidReceiveObject));
});