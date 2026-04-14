import { test, expect } from "vitest";
import net from "net";
import server, { startServer } from "../../src/modi1/server.js";

test("plain version: server executes ls and client connects", async () => {
  const srv = startServer();

  // Test: client connects
  await new Promise<void>(resolve => {
    const socket = net.connect({ port: 9000 }, () => {
      socket.end();
      resolve();
    });
  });

  // Test: server executes ls
  await new Promise<void>(resolve => {
    const socket = net.connect({ port: 9000 });

    socket.write("ls");

    socket.on("data", data => {
      expect(data.toString().length).toBeGreaterThan(0);
      socket.end();
      resolve();
    });
  });

  srv.close();
});
