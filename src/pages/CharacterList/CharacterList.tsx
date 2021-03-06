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

  useEffect(() => {
    (async () => {
      const apiReader = new MarvelApiReader();
      const realPage = page + 1;
      const data = await apiReader.getCharacters(50, (realPage - 1) * 50);
      setHasMore(true); //api returns so huge amount of characters we can ignore it for now
      setItems((prev) => [...prev, ...data]);
    })();
  }, [page]);

  return (
    <div ref={scrollerRef} className="scroller">
      <div className="header-container">
        <div className="header-text">Marvel Characters</div>
      </div>
      <div className="character-list-container">
        {items.map((character) => (
          <CharacterBox {...character} key={character.id} />
        ))}
      </div>
      {hasMore && <div ref={loaderRef}>Loading…</div>}
    </div>
  );
};
