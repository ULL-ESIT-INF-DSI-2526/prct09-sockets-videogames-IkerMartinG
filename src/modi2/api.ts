import request from "request";
import { ShowInfo, CastInfo, CastInfoRes } from "./types.js";

export function showInfo(
  title: string,
  url: string,
  callback: (err: Error | undefined, ShowInfo: ShowInfo | undefined) => void,
): void {
  request.get(url, (err, res) => {
    if (err) return callback(err, undefined);

    try {
      const data = JSON.parse(res.body);

      if (data === null) {
        return callback(new Error("La serie no existe"), undefined);
      }

      const info: ShowInfo = {
        id: data.id,
        name: data.name,
        genres: data.genres,
        status: data.status,
        premiered: data.premiered,
        averageRuntime: data.averageRuntime,
      };

      callback(undefined, info);
    } catch (e) {
      callback(new Error("Respuesta JSON inválida"), undefined);
    }
  });
}

/**
 * Obtiene el reparto de una serie usando su ID.
 * @param showId ID del show.
 * @param callback Callback que recibe (error, reparto).
 */
export function showCast(
  showId: number,
  url: string,
  callback: (err: Error | undefined, cast: CastInfoRes[] | undefined) => void,
): void {

  request.get(url, (err, res) => {
    if (err) return callback(err, undefined);

    try {
      const data = JSON.parse(res.body);

      const cast: CastInfoRes[] = data.map((entry: CastInfo) => ({
        actorName: entry.person.name,
        country: entry.person.country.name,
        gender: entry.person.gender,
        birthday: entry.person.birthday,
        characterName: entry.character.name,
      }));

      callback(undefined, cast);
    } catch (e) {
      callback(new Error("Respuesta JSON inválida"), undefined);
    }
  });
}
