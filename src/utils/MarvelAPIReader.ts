import md5 from "crypto-js/md5";

export type Character = {
  id: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export class MarvelApiReader {
  #hash: string;
  #apiKey: string;

  constructor() {
    this.#hash = md5(
      1 +
        "83835b6eb08d4245f069377e36b90d8a877f153d" + //private key
        "2e0935f80f3cad05b5d287c0d2eab0c1" //apikey
    ).toString();

    this.#apiKey = "2e0935f80f3cad05b5d287c0d2eab0c1";
  }

  async getCharacters(
    limit: number,
    offset: number
  ): Promise<Array<Character>> {
    let response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?apikey=${
        this.#apiKey
      }&ts=1&hash=${this.#hash}&limit=${limit}&offset=${offset}`
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
}
