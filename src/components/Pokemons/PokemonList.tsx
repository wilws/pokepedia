import PokemonItem from "./PokemonItem";
import {
  fetchInitialPokemonList,
  LoadDataFromPool,
  getDataSupplier,
  getSearchMode,
} from "@/store/pokemons-slice";
import { getImage, extractId } from "@/utils/utils";

import { useAppDispatch, useAppSelector } from "../../store/";
import { useEffect, useRef } from "react";


let isInitial = true;  

const PokemonList = (): JSX.Element => {


  const supplier = useAppSelector(getDataSupplier);
  const searchMode = useAppSelector(getSearchMode);
  const container = useRef<HTMLHeadingElement>(null);
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    if (isInitial) {
      dispatch(fetchInitialPokemonList());
      isInitial = false
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!container.current) return;
      const travelDistance = window.innerHeight + window.pageYOffset;
      const triggerPoint =
        container.current.offsetTop + container.current.offsetHeight / 1.5;
      if (travelDistance > triggerPoint) {
        if (!searchMode) {
          dispatch(LoadDataFromPool());
        } 
        // Handle fetch data when seach mode is on
        // else {
        //   console.log("trigger loadDataFromShadowPool");
        //   dispatch(LoadDataFromShadowPool());
        // }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchMode]);


  return (
    <div ref={container}>
      <ul className="pt-3 h-fit">
        {supplier.data.map((pokemon) => {
          const id = extractId(pokemon.url);
          const imgUrl = getImage(id);

          return (
            <PokemonItem
              key={id}
              id={id}
              name={pokemon.name}
              url={pokemon.url}
              imgUrl={imgUrl}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonList;