import express from "express";
import { initDCSModule } from "./dcs/main";

const app = express();

initDCSModule();

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(3000, () => console.log("Niod web server started on port 3000!"));
