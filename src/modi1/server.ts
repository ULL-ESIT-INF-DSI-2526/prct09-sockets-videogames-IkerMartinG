/**
 * Servidor TCP que ejecuta comandos enviados por el cliente.
 */

import net from "net";
import { exec } from "child_process";

const server = net.createServer(socket => {
  console.log("Cliente conectado:", socket.remoteAddress);

  socket.on("data", data => {
    const command = data.toString().trim();

    console.log("Comando recibido:", command);

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log("Error ejecutando comando:", err.message);
        console.log("stderr:", stderr);
        socket.write(`ERROR:\n${stderr}`);
      } else {
        console.log("Comando ejecutado correctamente");
        socket.write(stdout || "Comando ejecutado sin salida.");
      }
      socket.end();
    });
  });
});

/**
 * Arranca el servidor en el puerto 9000.
 */
export function startServer() {
  server.listen(9000, () => {
    console.log("Servidor escuchando en el puerto 9000");
  });
  return server;
}

export default server;

