import Link from 'next/link';
import { FastAverageColor } from "fast-average-color";
import { useEffect, useState,useRef } from 'react';

interface PokemonItemProp {
  id: string;
  name: string;
  url: string;
  imgUrl: string;
}


const PokemonItem = (props: PokemonItemProp) => {


  const { id, name, url, imgUrl } = props;
  const backgroundRef = useRef<HTMLDivElement>(null);
  const link = `/pokemons/${id}`;



 
  useEffect(() => {


    const fac = new FastAverageColor();
    fac
      .getColorAsync(imgUrl)
      .then((color) => {
        if (backgroundRef.current){
          backgroundRef.current.style.backgroundColor = color.rgba;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [imgUrl]);





  return (
    <li className="relative list-none md-2 w-full h-40 pt-5 md:h-52 hover:scale-105">
      <Link href={link} className="w-full">
        <div
          className="rounded-lg w-10/12 h-full bg-cyan-900 shadow-lg shadow-gray-400 pl-2 md:w-11/12"
          ref={backgroundRef}
        >
          <p className="bottom-3 absolute uppercase font-bold text-4xl text-stone-700  font-BigShouldersStencil tracking-wide drop-shadow-lg md:text-7xl">
            {name}
          </p>
        </div>
        <img
          className="h-full w-5/12 inline-block absolute top-0 right-0 object-contain md:w-3/12 translate-y-3"
          src={imgUrl}
        />
      </Link>
    </li>
  );
};

export default PokemonItem;
