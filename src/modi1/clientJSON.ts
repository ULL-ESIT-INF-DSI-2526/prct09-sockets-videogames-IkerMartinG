/**
 * Cliente TCP que envía un comando al servidor usando JSON.
 */

import net from "net";
import { RequestMessage, ResponseMessage } from "./types.js";

const args = process.argv.slice(2);
const command = args.join(" ");

const socket = net.connect({ port: 9001 });

const req: RequestMessage = { command };

socket.write(JSON.stringify(req));

socket.on("data", data => {
  const res = JSON.parse(data.toString()) as ResponseMessage;

  if (res.success) {
    console.log("Salida:\n", res.output);
  } else {
    console.log("ERROR:\n", res.output);
  }

  socket.end();
});
