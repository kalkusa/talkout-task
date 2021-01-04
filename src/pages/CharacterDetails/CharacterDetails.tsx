import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./CharacterDetails.css";
import {
  MarvelApiReader,
  CharacterDetails as CharacterInformation,
} from "../../utils/MarvelAPIReader";
import { useState, useEffect } from "react";

type TParams = { id: string };

export const CharacterDetails = ({ match }: RouteComponentProps<TParams>) => {
  const [
    characterInformation,
    setCharacterInformation,
  ] = useState<CharacterInformation>();

  useEffect(() => {
    const apiReader = new MarvelApiReader();
    async function fetchCharacters() {
      const characterInfo = await apiReader.getCharacterDetails(
        Number(match.params.id)
      );
      setCharacterInformation(characterInfo);
    }
    fetchCharacters();
  }, [match.params.id]);

  return (
    <div className="container">
      <div className="character-image">
        <img
          src={`${characterInformation?.thumbnail.path}.${characterInformation?.thumbnail.extension}`}
          alt={characterInformation?.name}
        />
      </div>
      <div className="character-info">
        <div className="character-name">
          <span>Name:</span> {characterInformation?.name}
        </div>
        <div className="character-description">
          <span>Description:</span>
          {characterInformation?.description
            ? characterInformation?.description
            : "No description"}
        </div>

        <div className="character-comics">
          Comics:
          <ul>
            {characterInformation?.comics.map((comic) => (
              <li>{comic.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
