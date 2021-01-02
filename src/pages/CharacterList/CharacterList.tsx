import * as React from "react";
import { MarvelApiReader, Character } from "../../utils/MarvelAPIReader";
import "./CharacterList.css";
import { useState, useEffect } from "react";
import { CharacterBox } from "../../components/CharacterBox/CharacterBox";

interface Props {}

export const CharacterList: React.FC<Props> = (props) => {
  const [characterList, setCharacterList] = useState<Array<Character>>([]);

  useEffect(() => {
    const apiReader = new MarvelApiReader();
    async function fetchCharacters() {
      const characters = await apiReader.getCharacters(50, 0);
      setCharacterList(characters);
    }
    fetchCharacters();
  }, []);

  if (characterList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      {characterList.map((character) => (
        <CharacterBox {...character} key={character.id} />
      ))}
    </React.Fragment>
  );
};
