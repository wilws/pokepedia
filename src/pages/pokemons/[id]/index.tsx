import { useRouter } from "next/router";
import { fetchSinglePokemonData } from "@/store/pokemons-slice";
import { useAppDispatch } from "../../../store"
import { useEffect, useRef, useState } from "react";
import { getImage } from "@/utils/utils";
import Ability from "../../../components/PokemonDetails/Ability";
import State from "../../../components/PokemonDetails/State";
import { FastAverageColor } from "fast-average-color";
import Abilities from "../../../components/PokemonDetails/Abilities"

let initial = true;
const Pokemon = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [abilities, setAbilities] = useState<Array<abilities>>([]);
  const [stats, setStats] = useState<Array<states>>([]);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [name, setName] = useState<string>("");
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [showSkill, setShowSkill] = useState<boolean>(false);

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
  
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = color.rgba;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [imgSrc]);

  const showSkillHandler = () => {
      setShowSkill((prevState:boolean)=> !prevState);
  }
  
  const goBackToFontPage = () => {
    router.push("/");
  }




  let statesKey = 0;

  const buttonStyle =
    "absolute bottom-1 rounded-lg bg-slate-600 text-white pl-2 pr-2 text-base z-0";

  return (
    <div
      ref={backgroundRef}
      className="relative overflow-hidden h-screen w-full p-5 z-0"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute z-50 top-2 right-2 rounded-lg border-2 border-slate-500 text-slate-500 pl-1 pr-1"
      >
        Back
      </button>
      <h1 className="font-BigShouldersStencil tracking-wide drop-shadow-lg text-5xl  uppercase font-bold  text-stone-700">
        {name}
      </h1>

      <img src={imgSrc} />
      <button
        type="button"
        onClick={showSkillHandler}
        className={
          showSkill
            ? `${buttonStyle} hidden transition ease-linear duration-1000 `
            : buttonStyle
        }
      >
        view Skills
      </button>

      <Abilities
        abilities={abilities}
        showSkill={showSkill}
        closeFunction={showSkillHandler}
      />
    </div>
  );
}

export default Pokemon;


  // <ul>
  //   {stats.map((state) => {
  //     return (
  //       <State
  //         key={statesKey++}
  //         base_stat={state.base_stat}
  //         effort={state.effort}
  //         stat={state.stat}
  //       />
  //     );
  //   })}
  // </ul>;