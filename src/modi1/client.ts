/**
 * Cliente TCP que envía un comando al servidor.
 */

import net from "net";

const args = process.argv.slice(2);
const command = args.join(" ");

const socket = net.connect({ port: 9000 });

socket.write(command);

socket.on("data", data => {
  console.log("Respuesta del servidor:\n", data.toString());
  socket.end();
});
