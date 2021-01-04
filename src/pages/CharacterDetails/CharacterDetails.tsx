import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./CharacterDetails.css";

type TParams = { id?: string };

//The character detail view should display the name, image and description, as well as
//a list of comics in which this character appears.
export const CharacterDetails = ({ match }: RouteComponentProps<TParams>) => {
  return (
    <div className="container">
      Details for character id: {match.params.id}{" "}
    </div>
  );
};
