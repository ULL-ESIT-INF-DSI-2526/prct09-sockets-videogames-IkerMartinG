import { describe, test, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { VideogameManager } from "../../src/ejercicio-1/services/VideogameManager.js";
import { Videogame, Platform, Genre } from "../../src/ejercicio-1/models/Videogame.js";

const BASE = "tests/ejercicio-1/test-data";

beforeEach(() => {
  if (fs.existsSync(BASE)) fs.rmSync(BASE, { recursive: true });
});

describe("VideogameManager", () => {
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
});
