import { describe, test, expect } from "vitest";
import net from "net";
import server from "../../src/ejercicio-1/server/server.js";

describe("Server", () => {
  test("responds to list", async () => {
    await new Promise<void>(resolve => {
      const socket = net.connect({ port: 7777 });

      socket.write(JSON.stringify({ type: "list", user: "iker" }));

      socket.on("data", data => {
        const res = JSON.parse(data.toString());
        expect(res.type).toBe("list");
        expect(res.success).toBe(true);
        socket.end();
        server.close();
        resolve();
      });
    });
  });
});
