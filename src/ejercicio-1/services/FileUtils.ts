import fs from "fs";
import path from "path";

/**
 * Asegura que un directorio existe.
 */
export function ensureDir(dir: string, cb: () => void): void {
  fs.mkdir(dir, { recursive: true }, () => cb());
}

/**
 * Comprueba si un fichero existe.
 */
export function fileExists(file: string, cb: (exists: boolean) => void): void {
  fs.access(file, fs.constants.F_OK, err => cb(!err));
}

/**
 * Lee un JSON.
 */
export function readJSON<T>(file: string, cb: (err: Error | null, data?: T) => void): void {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) return cb(err);
    try {
      cb(null, JSON.parse(data));
    } catch {
      cb(new Error("Invalid JSON"));
    }
  });
}

/**
 * Escribe un JSON.
 */
export function writeJSON(file: string, data: unknown, cb: (err: Error | null) => void): void {
  ensureDir(path.dirname(file), () => {
    fs.writeFile(file, JSON.stringify(data, null, 2), cb);
  });
}
