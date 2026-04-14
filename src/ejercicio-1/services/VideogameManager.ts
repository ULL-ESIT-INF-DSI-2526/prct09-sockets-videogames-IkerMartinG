/**
 * Gestor de videojuegos en el servidor.
 * @packageDocumentation
 */

import path from "path";
import fs from "fs";
import { Videogame } from "../models/Videogame.js";
import { fileExists, readJSON, writeJSON, ensureDir } from "./FileUtils.js";

/**
 * Gestiona la colección de videojuegos de cada usuario.
 */
export class VideogameManager {
  constructor(private basePath: string) {}

  private userDir(user: string): string {
    return path.join(this.basePath, user);
  }

  private gameFile(user: string, id: number): string {
    return path.join(this.userDir(user), `${id}.json`);
  }

  add(user: string, game: Videogame, cb: (err: Error | null) => void): void {
    const file = this.gameFile(user, game.id);

    fileExists(file, exists => {
      if (exists) return cb(new Error("Videogame already exists"));

      writeJSON(file, game, cb);
    });
  }

  update(user: string, game: Videogame, cb: (err: Error | null) => void): void {
    const file = this.gameFile(user, game.id);

    fileExists(file, exists => {
      if (!exists) return cb(new Error("Videogame not found"));

      writeJSON(file, game, cb);
    });
  }

  remove(user: string, id: number, cb: (err: Error | null) => void): void {
    const file = this.gameFile(user, id);

    fileExists(file, exists => {
      if (!exists) return cb(new Error("Videogame not found"));

      fs.unlink(file, cb);
    });
  }

  read(user: string, id: number, cb: (err: Error | null, game?: Videogame) => void): void {
    const file = this.gameFile(user, id);

    readJSON<Videogame>(file, cb);
  }

  list(user: string, cb: (err: Error | null, games?: Videogame[]) => void): void {
    const dir = this.userDir(user);

    ensureDir(dir, () => {
      fs.readdir(dir, (err, files) => {
        if (err) return cb(err);

        const games: Videogame[] = [];
        let pending = files.length;

        if (pending === 0) return cb(null, []);

        files.forEach(f => {
          readJSON<Videogame>(path.join(dir, f), (err, game) => {
            if (!err && game) games.push(game);
            if (--pending === 0) cb(null, games);
          });
        });
      });
    });
  }
}
