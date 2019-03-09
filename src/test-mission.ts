import { initNiod, spawnGroupInZone, addTrigger } from "./app";

const f = async () => {
  const server = await initNiod();
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
    1000
  );
};
f();
