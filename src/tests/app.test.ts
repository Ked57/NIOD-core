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
      resolve();
    });
    server.on("listening", () => {
      server.close();
      reject();
    });
  });
};

test("Start a NIOD server", async t => {
  try {
    const app = await initNiod(true);
    app.listen(3000, () =>
      console.log("Niod web server started on port 3000!")
    );
    let serverStarted;
    try {
      await portInUse(3000);
      serverStarted = true;
    } catch (err) {
      serverStarted = false;
    }
    t.false(serverStarted);
  } catch (err) {
    console.error(err);
    t.fail();
  }
});
