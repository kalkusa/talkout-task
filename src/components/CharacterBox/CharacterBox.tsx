import * as React from "react";
import { Character } from "../../utils/MarvelAPIReader";

export const CharacterBox: React.FC<Character> = (props) => {
  const { name } = props;
  return (
    <div>
      <div>{name}</div>
    </div>
  );
};
