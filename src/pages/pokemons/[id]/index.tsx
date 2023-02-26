import { useRouter } from "next/router";
import { fetchSinglePokemonData } from "@/store/pokemons-slice";
import { useAppDispatch } from "../../../store"
import { useEffect, useRef, useState } from "react";
import { getImage } from "@/utils/utils";
import Ability from "../../../components/PokemonDetails/Ability";
import State from "../../../components/PokemonDetails/State";
import { FastAverageColor } from "fast-average-color";

let initial = true;
const Pokemon = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [abilities, setAbilities] = useState<Array<abilities>>([]);
  const [stats, setStats] = useState<Array<states>>([]);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [name, setName] = useState<string>("");

  const [backgroundColor, setBackgroundColor] = useState<string>("");




  useEffect(() => {
    if (router.isReady) {

      const id = router.query.id;
      if(!id || typeof id !== 'string' || isNaN(+id)){
         router.push("/");
         return;
      }

      dispatch(fetchSinglePokemonData(id))
      .then((response) => {
      
        if ( !response?.abilities.length || 
             !response?.stats.length || 
             !response?.name.length) {
               return Promise.reject('empty response');
             }

        setAbilities(response.abilities);
        setStats(response.stats);
        setName(response.name);
        setImgSrc(getImage(id));
      })
      .catch((err) => {
        // error handling
        console.log(err);
      })
    }
  }, [router.isReady]);


  useEffect(() => {
    if (initial){
      initial = false;
      return 
    }
  
    const fac = new FastAverageColor();
    fac.getColorAsync(imgSrc)
      .then((color) => {
        setBackgroundColor(color.rgb);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [imgSrc]);



  let abilitiesKey = 0;
  let statesKey = 0;

  return (
    <div>
      <img src={imgSrc}/>
      <h1>{name}</h1>
      <ul>
        {abilities.map((ability) => {
          return (
            <Ability
              key={abilitiesKey++}
              ability={ability.ability}
              is_hidden={ability.is_hidden}
              slot={ability.slot}
            />
          );
        })}
        -----
        {stats.map((state) => {
          return (
            <State
              key={statesKey++}
              base_stat={state.base_stat}
              effort={state.effort}
              stat={state.stat}
            />
          );
        })}
      </ul>
    </div>
  );

}

export default Pokemon;
