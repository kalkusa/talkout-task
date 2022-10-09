import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./CharacterDetails.css";
import {
  MarvelApiReader,
  CharacterDetails as CharacterInformation,
} from "../../utils/MarvelAPIReader";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

type TParams = { id: string };

export const CharacterDetails = ({ match }: RouteComponentProps<TParams>) => {
  const [characterInformation, setCharacterInformation] =
    useState<CharacterInformation>();

  const history = useHistory();

  function handleClick() {
    history.push(`/`);
  }

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
      <div className="character-name-label">Name:</div>
      <div className="character-name">{characterInformation?.name}</div>
      <div className="character-description-label">Description:</div>
      <div className="character-description">
        {characterInformation?.description
          ? characterInformation?.description
          : "No description"}
      </div>
      <div className="character-comics-label">Comics:</div>
      <div className="character-comics">
        {characterInformation?.comics.map((comic) => (
          <span className="comma-separated">{comic.name}</span>
        ))}
      </div>
      <div className="back-to-list" onClick={handleClick}>
        &larr;
      </div>
      <div className="mobile">
        Mobile view not prepared, but of course I could do it...
      </div>
    </div>
  );
};
