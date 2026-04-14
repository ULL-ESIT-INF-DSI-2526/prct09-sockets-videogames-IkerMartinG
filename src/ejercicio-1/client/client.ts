/**
 * Cliente TCP para enviar peticiones al servidor.
 * @packageDocumentation
 */

import net from "net";
import chalk from "chalk";
import { RequestType, ResponseType } from "../types/messages.js";

/**
 * Envía una petición al servidor y procesa la respuesta.
 */
export function sendRequest(req: RequestType): void {
  const socket = net.connect({ port: 7777 });

  socket.write(JSON.stringify(req));

  socket.on("data", data => {
    const res = JSON.parse(data.toString()) as ResponseType;

    if (res.success) console.log(chalk.green(res.message));
    else console.log(chalk.red(res.message));

    if (res.videogame) console.log(res.videogame);
    if (res.videogames) console.log(res.videogames);

    socket.end();
  });
}
