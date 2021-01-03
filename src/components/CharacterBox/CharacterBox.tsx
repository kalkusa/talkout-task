import * as React from "react";
import { Character } from "../../utils/MarvelAPIReader";
import "./CharacterBox.css";

export const CharacterBox: React.FC<Character> = (props) => {
  const { name, thumbnail } = props;
  return (
    <div className="box">
      {/* <div className="name">{name}</div> */}
      <img
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
      />
    </div>
  );
};
