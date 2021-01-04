import md5 from "crypto-js/md5";

export type Character = {
  id: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type CharacterDetails = {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: Array<Comic>;
};

export type Comic = {
  name: string;
};

export class MarvelApiReader {
  #hash: string;
  #apiKey: string = "2e0935f80f3cad05b5d287c0d2eab0c1";
  #privateKey: string = "83835b6eb08d4245f069377e36b90d8a877f153d";
  #apiAddress: string = "https://gateway.marvel.com:443/v1/public/";

  constructor() {
    this.#hash = md5(1 + this.#privateKey + this.#apiKey).toString();

    this.#apiKey = "2e0935f80f3cad05b5d287c0d2eab0c1";
  }

  async getCharacters(
    limit: number,
    offset: number
  ): Promise<Array<Character>> {
    let response = await fetch(
      `${this.#apiAddress}characters?apikey=${this.#apiKey}&ts=1&hash=${
        this.#hash
      }&limit=${limit}&offset=${offset}`
    );

    let results = await response.json();

    let characterList = await results.data.results.map((item) => ({
      id: item.id,
      name: item.name,
      thumbnail: {
        path: item.thumbnail.path,
        extension: item.thumbnail.extension,
      },
    }));

    return characterList;
  }

  async getCharacterDetails(id: number): Promise<CharacterDetails> {
    let response = await fetch(
      `${this.#apiAddress}characters/${id}?apikey=${this.#apiKey}&ts=1&hash=${
        this.#hash
      }`
    );

    let results = await response.json();

    let character = await results.data.results.map((character) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: {
        path: character.thumbnail.path,
        extension: character.thumbnail.extension,
      },
      comics: character.comics.items.map((comic) => ({
        name: comic.name,
      })),
    }));

    return character[0];
  }
}
