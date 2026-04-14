/**
 * Modelo de videojuego.
 * @packageDocumentation
 */

export enum Platform {
  PC = "PC",
  PS5 = "PlayStation 5",
  Xbox = "Xbox Series X/S",
  Switch = "Nintendo Switch",
  SteamDeck = "Steam Deck"
}

export enum Genre {
  Action = "Acción",
  Adventure = "Aventura",
  RPG = "Rol",
  Strategy = "Estrategia",
  Sports = "Deportes",
  Simulation = "Simulación"
}

/**
 * Representa un videojuego almacenado en el sistema.
 */
export class Videogame {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public platform: Platform,
    public genre: Genre,
    public developer: string,
    public year: number,
    public multiplayer: boolean,
    public hours: number,
    public value: number
  ) {}
}
