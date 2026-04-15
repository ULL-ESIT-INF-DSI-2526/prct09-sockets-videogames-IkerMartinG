/**
 * Servidor TCP que ejecuta comandos enviados por el cliente usando JSON.
 */

import net from "net";
import { exec } from "child_process";
import { RequestMessage, ResponseMessage } from "./types.js";

const server = net.createServer(socket => {
  socket.on("data", data => {
    const req = JSON.parse(data.toString()) as RequestMessage;

    exec(req.command, (err, stdout, stderr) => {
      const res: ResponseMessage = {
        success: !err,
        output: err ? stderr : stdout
      };

      socket.write(JSON.stringify(res));
      socket.end();
    });
  });
});

export function startServer() {
  server.listen(9001);
  return server;
}
startServer();
export default server;

