import net from "net";
import { RequestType, ResponseType } from "../types/messages.js";
import { VideogameManager } from "../services/VideogameManager.js";

const manager = new VideogameManager("src/ejercicio-1/data");

const server = net.createServer(socket => {
  socket.on("data", data => {
    const req = JSON.parse(data.toString()) as RequestType;

    const respond = (res: ResponseType) => {
      socket.write(JSON.stringify(res));
    };

    switch (req.type) {
      case "add":
        manager.add(req.user, req.videogame!, err =>
          respond({
            type: "add",
            success: !err,
            message: err ? err.message : "Videogame added"
          })
        );
        break;

      case "update":
        manager.update(req.user, req.videogame!, err =>
          respond({
            type: "update",
            success: !err,
            message: err ? err.message : "Videogame updated"
          })
        );
        break;

      case "remove":
        manager.remove(req.user, req.id!, err =>
          respond({
            type: "remove",
            success: !err,
            message: err ? err.message : "Videogame removed"
          })
        );
        break;

      case "read":
        manager.read(req.user, req.id!, (err, game) =>
          respond({
            type: "read",
            success: !err,
            message: err ? err.message : "Videogame found",
            videogame: game
          })
        );
        break;

      case "list":
        manager.list(req.user, (err, games) =>
          respond({
            type: "list",
            success: !err,
            message: err ? err.message : "List retrieved",
            videogames: games
          })
        );
        break;
    }
  });
});

export function startServer() {
  server.listen(7777);
  return server;
}

export default server;


