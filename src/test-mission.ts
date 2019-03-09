import { initNiod, spawnGroupInZone } from "./app";

const f = async () => {
  const server = await initNiod();
  spawnGroupInZone("template_group", "zone", () => {
    console.log("group spawned");
  });
};
f();
