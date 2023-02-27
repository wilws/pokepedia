import { useRouter } from "next/router";
import { fetchSinglePokemonData } from "@/store/pokemons-slice";
import { useAppDispatch } from "../../../store"
import { useEffect, useRef, useState } from "react";
import { getImage } from "@/utils/utils";
import State from "../../../components/PokemonDetails/State";
import { FastAverageColor } from "fast-average-color";
import Abilities from "../../../components/PokemonDetails/Abilities"


const Pokemon = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [abilities, setAbilities] = useState<Array<abilities>>([]);
  const [stats, setStats] = useState<Array<states>>([]);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [showSkill, setShowSkill] = useState<boolean>(false);
  const [isParentReady, setIsParentReady] = useState<boolean>(false);


  useEffect(() => {

    if (router.isReady) {
      const id = router.query.id;
      if (!id || typeof id !== "string" || isNaN(+id)) {
        router.push("/");
        return;
      }

      dispatch(fetchSinglePokemonData(id))
      .then((response) => {

          if (
            !response?.abilities.length ||
            !response?.stats.length ||
            !response?.name.length
          ) {
            return Promise.reject("empty response");
          }

          setAbilities(response.abilities);
          setStats(response.stats);
          setName(response.name);

          const imgPath = getImage(id)
          setImgSrc(imgPath);
          return imgPath;

      })
      .then((imgPath:string) => {

        // set background color
        const fac = new FastAverageColor();
        return fac.getColorAsync(imgPath);

      })
      .then((color) => {

        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = color.rgba;

        } else {
          return Promise.reject("empty backgroundRef.current");
        }
        // signal to child. Activate their useEffect()
        setIsParentReady(true);
      })
      .catch((err) => {
        // error handling
        console.log(err);
      });
    }
  }, [router.isReady]);



  const showSkillHandler = () => {
    setShowSkill((prevState: boolean) => !prevState);
  };


  const buttonStyle =
    `absolute bottom-5 left-5 w-4/12 z-50 rounded-lg 
     bg-slate-600 text-white pl-2 pr-2 mt-2 text-base 
     z-0 md:text-2xl md:w-3/12 xl:invisible`;

  return (
    <div
      ref={backgroundRef}
      className="relative overflow-hidden h-screen w-full p-5 pb-3 z-0 flex flex-col xl:block xl:pb-4"
    >
      <button
        type="button"
        onClick={() => router.push("/")}
        className="absolute z-50 top-2 right-2 rounded-lg border-2 border-slate-500 text-slate-500 pl-1 pr-1 md:text-2xl md:top-4 md:right-5 xl:text-4xl"
      >
        Back
      </button>

      <h1 className="flex-none h-25 font-BigShouldersStencil tracking-wide drop-shadow-lg text-5xl  uppercase font-bold  text-stone-700 md:text-6xl xl:text-7xl">
        {name}
      </h1>

      <img
        className="flex-none h-2/4 relative left-1/2 -translate-x-1/2 object-contain md:h-1/2 md:w-8/12 md:object-contain xl:left:0 xl:translate-x-0 xl:absolute xl:right-0 xl:top-96"
        src={imgSrc}
      />

      <div className="flex-auto  overflow-hidden relative z-40  h-fit  xl:w-3/4 xl:absolute xl:top-36 xl:left-5 flex flex-wrap flex-col-reverse xl:h-[calc(100vh_-_10rem)] xl:pb-3">
        <Abilities
          abilities={abilities}
          showSkill={showSkill}
          closeFunction={showSkillHandler}
          isParentReady={isParentReady}
        />

        <State stats={stats} isParentReady={isParentReady} />
      </div>

      <button
        type="button"
        onClick={showSkillHandler}
        className={
          showSkill
            ? `${buttonStyle} invisible transition ease-linear duration-1000 z-50`
            : buttonStyle
        }
      >
        view skills
      </button>
    </div>
  );
}

export default Pokemon;


