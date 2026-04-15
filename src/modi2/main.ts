/**
 * Programa principal que encadena showInfo()
 */

import { showInfo, showCast } from "./api.js";

const title = process.argv.slice(2).join(" ");
const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(title)}`;
const url_cast = `https://api.tvmaze.com/shows/`;

if (!title) {
  console.log("Uso: node dist/modi2/main.js <nombre de la serie>");
  process.exit(1);
}

showInfo(title, url, (err, info) => {
  if (err || !info) {
    console.error("Error obteniendo información del show:", err?.message);
    return;
  }

  console.log(`\n=== ${info.name} ===`);
  console.log(`ID: ${info.id}`);
  console.log(`Estado: ${info.status}`);
  console.log(`Estrenada: ${info.premiered}`);
  console.log(`Duración media: ${info.averageRuntime} min`);
  console.log(`Géneros: ${info.genres.join(", ")}`);

  const url_cast = `https://api.tvmaze.com/shows/${info.id}/cast`;

  showCast(info.id, url_cast, (err2, cast) => {
    if (err2 || !cast) {
      console.error("Error obteniendo el reparto:", err2?.message);
      return;
    }

    console.log("\n=== Reparto ===");
    console.table(
      cast.map((c) => ({
        Actor: c.actorName,
        País: c.country,
        Género: c.gender,
        Nacimiento: c.birthday,
        Personaje: c.characterName,
      })),
    );
  });
});

