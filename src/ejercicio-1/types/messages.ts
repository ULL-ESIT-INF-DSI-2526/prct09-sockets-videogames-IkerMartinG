/**
 * Tipos de mensajes intercambiados entre cliente y servidor.
 * @packageDocumentation
 */

import { Videogame } from "../models/Videogame.js";

/**
 * Tipos de petición permitidos.
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user: string;
  videogame?: Videogame;
  id?: number;
};

/**
 * Tipos de respuesta enviadas por el servidor.
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  message: string;
  videogames?: Videogame[];
  videogame?: Videogame;
};
