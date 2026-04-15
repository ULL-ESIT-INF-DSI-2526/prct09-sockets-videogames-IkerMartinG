/**
 * Información básica de un show obtenida desde TVmaze.
 */
export interface ShowInfo {
  id: number;
  name: string;
  genres: string[];
  status: string;
  premiered: string;
  averageRuntime: number;
}

/**
 * Información de un actor/actriz y su personaje.
 */
export interface CastInfo {
  person: {
    name: string;
    country: {
      name: string;
    };
    birthday: string;
    gender: string;
  };
  character: {
    name: string;
  };
}

export interface CastInfoRes {
    actorName: string,
    country: string,
    gender: string,
    birthday: string,
    characterName: string
}
