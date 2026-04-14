import net from "net";
import { describe, test, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";

import server, { startServer } from "../../src/ejercicio-1/server/server.js";
import { VideogameManager } from "../../src/ejercicio-1/services/VideogameManager.js";
import { Videogame, Platform, Genre } from "../../src/ejercicio-1/models/Videogame.js";

const BASE = "tests/ejercicio-1/test-data";

beforeEach(() => {
  if (fs.existsSync(BASE)) fs.rmSync(BASE, { recursive: true });
});

describe("Ejercicio 1 – Tests unificados", () => {

  // ------------------------------
  // 1. TESTS DEL MANAGER
  // ------------------------------
  test("add creates file", async () => {
    const m = new VideogameManager(BASE);
    const g = new Videogame(1, "A", "B", Platform.PC, Genre.Action, "Dev", 2020, false, 10, 50);

    await new Promise<void>(resolve => {
      m.add("iker", g, err => {
        expect(err).toBeNull();
        expect(fs.existsSync(path.join(BASE, "iker", "1.json"))).toBe(true);
        resolve();
      });
    });
  });

  // ------------------------------
  // 2. TEST DEL SERVIDOR (list)
  // ------------------------------
  test("Server responds to list request", async () => {
    const srv = startServer();

    await new Promise<void>(resolve => {
      const socket = net.connect({ port: 7777 });

      socket.write(JSON.stringify({ type: "list", user: "iker" }));

      socket.on("data", data => {
        const res = JSON.parse(data.toString());
        expect(res.type).toBe("list");
        expect(res.success).toBe(true);
        expect(Array.isArray(res.videogames)).toBe(true);

        socket.end();
        srv.close();
        resolve();
      });
    });
  });

  // ------------------------------
  // 3. TEST DEL CLIENTE (conexión)
  // ------------------------------
  test("Client connects to server", async () => {
    const srv = startServer();

    await new Promise<void>(resolve => {
      const socket = net.connect({ port: 7777 }, () => {
        socket.end();
        srv.close();
        resolve();
      });
    });

    expect(true).toBe(true);
  });

});
