import {
  initNiod,
  getGroupInfo,
  spawnGroupInZone,
  addTrigger
} from "./app";

const f = () => {
  addTrigger(
    "GroupPartlyOrCompletelyInZone",
    "template_group#001",
    "zone",
    "once",
    () => console.log("trigger triggered")
  );
  setTimeout(
    () =>
      spawnGroupInZone("template_group", "zone", () =>
        console.log("group spawned")
      ),
    2000);
  setTimeout(() => console.log(getGroupInfo()), 7500);
};

const serverInit = initNiod();
serverInit.then(() => {
  console.log("init done");
  f();
});
