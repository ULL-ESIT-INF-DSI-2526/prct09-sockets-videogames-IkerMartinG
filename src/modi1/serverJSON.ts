/**
 * Servidor TCP que ejecuta comandos enviados por el cliente usando JSON.
 * Incluye mensajes por consola para depuración y trazabilidad.
 */

import net from "net";
import { exec } from "child_process";
import { RequestMessage, ResponseMessage } from "./types.js";

/**
 * Servidor TCP que procesa mensajes JSON y ejecuta comandos del sistema.
 */
const server = net.createServer(socket => {
  console.log("Cliente conectado:", socket.remoteAddress);

  socket.on("data", data => {
    const raw = data.toString();
    console.log("Petición recibida:", raw);

    let req: RequestMessage;

    try {
      req = JSON.parse(raw) as RequestMessage;
    } catch (e) {
      console.log("Error: JSON inválido");
      socket.write(JSON.stringify({ success: false, output: "JSON inválido" }));
      socket.end();
      return;
    }

    exec(req.command, (err, stdout, stderr) => {
      if (err) {
        console.log("Error ejecutando comando:", err.message);
        console.log("stderr:", stderr);
      } else {
        console.log("Comando ejecutado correctamente");
      }

      const res: ResponseMessage = {
        success: !err,
        output: err ? stderr : stdout
      };

      console.log("Respuesta enviada:", res);

      socket.write(JSON.stringify(res));
      socket.end();
    });
  });

  socket.on("end", () => {
    console.log("Cliente desconectado");
  });
});

/**
 * Arranca el servidor JSON en el puerto 9001.
 */
export function startServer() {
  server.listen(9001, () => {
    console.log("Servidor JSON escuchando en el puerto 9001");
  });
  return server;
}

export default server;
