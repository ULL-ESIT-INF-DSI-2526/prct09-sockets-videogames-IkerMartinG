import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { sendRequest } from "../client/client.js";
import { Videogame, Platform, Genre } from "../models/Videogame.js";

yargs(hideBin(process.argv))

  .command("add", "Add videogame", y =>
    y.option("user", { type: "string", demandOption: true })
     .option("id", { type: "number", demandOption: true })
     .option("name", { type: "string", demandOption: true })
     .option("desc", { type: "string", demandOption: true })
     .option("platform", { type: "string", demandOption: true })
     .option("genre", { type: "string", demandOption: true })
     .option("developer", { type: "string", demandOption: true })
     .option("year", { type: "number", demandOption: true })
     .option("multiplayer", { type: "boolean", demandOption: true })
     .option("hours", { type: "number", demandOption: true })
     .option("value", { type: "number", demandOption: true })
  , argv => {
    sendRequest({
      type: "add",
      user: argv.user!,
      videogame: new Videogame(
        argv.id!, argv.name!, argv.desc!,
        argv.platform as Platform,
        argv.genre as Genre,
        argv.developer!, argv.year!,
        argv.multiplayer!, argv.hours!, argv.value!
      )
    });
  })

  .command("update", "Update videogame", y =>
    y.option("user", { type: "string", demandOption: true })
     .option("id", { type: "number", demandOption: true })
     .option("name", { type: "string", demandOption: true })
     .option("desc", { type: "string", demandOption: true })
     .option("platform", { type: "string", demandOption: true })
     .option("genre", { type: "string", demandOption: true })
     .option("developer", { type: "string", demandOption: true })
     .option("year", { type: "number", demandOption: true })
     .option("multiplayer", { type: "boolean", demandOption: true })
     .option("hours", { type: "number", demandOption: true })
     .option("value", { type: "number", demandOption: true })
  , argv => {
    sendRequest({
      type: "update",
      user: argv.user!,
      videogame: new Videogame(
        argv.id!, argv.name!, argv.desc!,
        argv.platform as Platform,
        argv.genre as Genre,
        argv.developer!, argv.year!,
        argv.multiplayer!, argv.hours!, argv.value!
      )
    });
  })

  .command("remove", "Remove videogame", y =>
    y.option("user", { type: "string", demandOption: true })
     .option("id", { type: "number", demandOption: true })
  , argv => {
    sendRequest({
      type: "remove",
      user: argv.user!,
      id: argv.id!
    });
  })

  .command("read", "Read videogame", y =>
    y.option("user", { type: "string", demandOption: true })
     .option("id", { type: "number", demandOption: true })
  , argv => {
    sendRequest({
      type: "read",
      user: argv.user!,
      id: argv.id!
    });
  })

  .command("list", "List videogames", y =>
    y.option("user", { type: "string", demandOption: true })
  , argv => {
    sendRequest({
      type: "list",
      user: argv.user!
    });
  })

  .help()
  .parse();
