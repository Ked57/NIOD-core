import express from "express";
import * as core from "express-serve-static-core";
import { initDCSModule } from "./dcs/main";
import { spawnGroup, spawnGroupInZone } from "./dcs/game/game_functions";

const initNiod = (dontTryToConnect: Boolean) => {
  return new Promise<core.Express>((resolve, reject) => {
    const app = express();

    if (dontTryToConnect) {
      resolve(app);
    }
    const connected = initDCSModule();

    connected.subscribe({
      next: value => (value ? resolve(app) : ""),
      error: err => reject("Something wrong occurred: " + err),
      complete: () => reject("The observable completed, please restart the app")
    });
  });
};

/*app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(3000, () => console.log("Niod web server started on port 3000!"));*/

export { initNiod, spawnGroup, spawnGroupInZone };
