import * as React from "react";
import { Character } from "../../utils/MarvelAPIReader";
import "./CharacterBox.css";
import { useHistory } from "react-router-dom";

export const CharacterBox: React.FC<Character> = (props) => {
  const { id, name, thumbnail } = props;
  const history = useHistory();

  function handleClick() {
    history.push(`/character?id=${id}`);
  }

  //For the demo purpose we filter out characters without image
  if (
    thumbnail.path.includes("image_not_available") ||
    thumbnail.path.includes("4c002e0305708")
  ) {
    return <></>;
  }

  return (
    <div className="box" onClick={handleClick}>
      <div className="name wordwrap">{name}</div>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />)
    </div>
  );
};
