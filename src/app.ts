import express from "express";
import * as core from "express-serve-static-core";
import { initDCSModule } from "./dcs/main";
import { spawnGroup, spawnGroupInZone } from "./dcs/game/game_functions";
import { addTrigger } from "./dcs/game/trigger_functions";
import { addA2ADispatcher } from "./dcs/game/a2a_dispatcher_functions";
import { getGroupInfo } from "./dcs/store/store_group_info";
import { Observable } from "rxjs";

const initNiod = (): [core.Express, Observable<Boolean>] => {
  const app = express();

  return [app, initDCSModule()];
};

/*app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(3000, () => console.log("Niod web server started on port 3000!"));*/

export {
  initNiod,
  spawnGroup,
  spawnGroupInZone,
  addTrigger,
  addA2ADispatcher,
  getGroupInfo
};
