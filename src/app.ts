import express from "express";
import DCSModule from "./dcs/main";

const app = express();

DCSModule.init();

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(3000, () => console.log("Niod web server started on port 3000!"));
