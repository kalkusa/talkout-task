import React, { useState, useEffect } from "react";
import { MarvelApiReader, Character } from "../../utils/MarvelAPIReader";
import "./CharacterList.css";
import { CharacterBox } from "../../components/CharacterBox/CharacterBox";
import useInfiniteScroll from "@closeio/use-infinite-scroll";

interface Props {}

export const CharacterList: React.FC<Props> = (props) => {
  const [items, setItems] = useState<Array<Character>>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, loaderRef, scrollerRef] = useInfiniteScroll({ hasMore });

  // useEffect(() => {
  //   const apiReader = new MarvelApiReader();
  //   async function fetchCharacters() {
  //     const characters = await apiReader.getCharacters(50, 0);
  //     setCharacterList(characters);
  //   }
  //   fetchCharacters();
  // }, []);

  console.log("page: %o", page);

  useEffect(() => {
    (async () => {
      console.log("effect");
      const apiReader = new MarvelApiReader();
      const realPage = page + 1;
      // console.log("realPage: %o", realPage);
      const data = await apiReader.getCharacters(20, (realPage - 1) * 20);
      setHasMore(true);
      // console.log("data:%o", data);
      setItems((prev) => [...prev, ...data]);
    })();
  }, [page]);

  // if (items.length === 0) {
  //   return <div>Loading...</div>;
  // }

  console.log("items: %o", items.length);

  return (
    // <div className="character-list-container" ref={scrollerRef}>
    //   {items.map((character) => (
    //     <CharacterBox {...character} key={character.id} />
    //   ))}
    //   {/* {hasMore && <div ref={loaderRef}>Loading…</div>} */}
    //   <div ref={loaderRef}>Loading…</div>
    // </div>
    <div ref={scrollerRef} className="character-list-container">
      {items.map((character) => (
        <CharacterBox {...character} key={character.id} />
      ))}
      {hasMore && <div ref={loaderRef}>Loading…</div>}
    </div>
  );
};
