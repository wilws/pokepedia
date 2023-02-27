import Link from 'next/link';
import { FastAverageColor } from "fast-average-color";
import { useEffect,useRef } from 'react';

interface PokemonItemProp {
  id: string;
  name: string;
  url: string;
  imgUrl: string;
}

const PokemonItem = (props: PokemonItemProp) => {

  const { id, name, imgUrl } = props;
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
    <li className="relative list-none md-2 w-full h-40 pt-5 md:h-52 lg:min-w-90 lg:w-1/3 lg:h-150 lg:pt-0 lg:max-w-42 lg:p-3 lg:mb-3  xl:w-1/4 2xl:w-1/5">
      <Link href={link} className="relative w-full h-full flex">
        <div
          className="relative rounded-lg w-10/12 h-full shadow-lg shadow-gray-400 pl-2 md:w-11/12 lg:w-full"
          ref={backgroundRef}
        >
          <p className="bottom-3 absolute uppercase font-bold text-4xl text-stone-700  font-BigShouldersStencil tracking-wide drop-shadow-lg md:text-7xl lg:text-5xl">
            {name}
          </p>
        </div>

        <div className=" lg:visible lg:bg-gray-100 lg:w-72 lg:h-72 rounded-full lg:absolute lg:top-1/2 lg:-translate-y-2/3 lg:right-0 lg:left-0 lg:m-auto "></div>

        <img
          className="absolute top-0 right-0 h-full w-5/12 object-contain md:w-3/12 translate-y-3 lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:left-0 lg:m-auto lg:w-10/12 "
          src={imgUrl}
        />
      </Link>
    </li>
  );
};

export default PokemonItem;
