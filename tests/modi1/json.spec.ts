import { test, expect } from "vitest";
import net from "net";
import server, { startServer } from "../../src/modi1/serverJSON.js";

test("JSON version: server executes ls and client connects", async () => {
  const srv = startServer();

  // Test: client connects
  await new Promise<void>(resolve => {
    const socket = net.connect({ port: 9001 }, () => {
      socket.end();
      resolve();
    });
  });

  // Test: server executes ls
  await new Promise<void>(resolve => {
    const socket = net.connect({ port: 9001 });

    socket.write(JSON.stringify({ command: "ls" }));

    socket.on("data", data => {
      const res = JSON.parse(data.toString());
      expect(res.success).toBe(true);
      expect(res.output.length).toBeGreaterThan(0);
      socket.end();
      resolve();
    });
  });

  // Test: invalid command
  await new Promise<void>(resolve => {
    const socket = net.connect({ port: 9001 });

    socket.write(JSON.stringify({ command: "asdfgh123" }));

    socket.on("data", data => {
      const res = JSON.parse(data.toString());
      expect(res.success).toBe(false);
      expect(res.output.length).toBeGreaterThan(0);
      socket.end();
      resolve();
    });
  });

  srv.close();
});
