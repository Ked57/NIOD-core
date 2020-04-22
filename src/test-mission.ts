import {
  initNiod,
  execute,
  getGroupInfo,
  addTrigger
} from "./app";

const f = () => {
  addTrigger(
    "GroupPartlyOrCompletelyInZone",
    "template_group",
    "zone",
    "repeat",
    () => console.log("trigger triggered")
  );
  setTimeout(() => console.log(getGroupInfo()), 7500);
};

const serverInit = initNiod();
serverInit.then(() => {
  console.log("init done");
  f();
});
