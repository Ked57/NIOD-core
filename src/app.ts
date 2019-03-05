import express from "express";
import { initDCSModule } from "./dcs/main";
import { spawnGroup, spawnGroupInZone } from "./dcs/game/game_functions";

const app = express();

initDCSModule();

/*app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(3000, () => console.log("Niod web server started on port 3000!"));*/

export { app, spawnGroup, spawnGroupInZone };
