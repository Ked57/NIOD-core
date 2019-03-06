import test from "ava";
import net from "net";
import { initNiod, spawnGroupInZone } from "../app";

const portInUse = (port: number) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer(socket => {
      socket.write("Echo server\r\n");
      socket.pipe(socket);
    });
    server.listen(port, "127.0.0.1");
    server.on("error", err => {
      console.log("port is in use");
      resolve(true);
    });
    server.on("listening", () => {
      server.close();
      console.error("port isn't in use");
      reject("port isn't in use");
    });
  });
};

test("Start a NIOD server", async t => {
  try {
    const app = await initNiod(true);
    app.listen(3000, async () => {
      console.log("Niod web server started on port 3000!");

      let serverStarted;
      try {
        serverStarted = await portInUse(3000);
      } catch (err) {
        serverStarted = false;
      }
      t.true(serverStarted);
    });
  } catch (err) {
    console.error(err);
    t.fail();
  }
});
