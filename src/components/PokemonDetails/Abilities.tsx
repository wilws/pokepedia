import { useEffect, useState } from "react";
import Ability from "./Ability";


interface Props {
  abilities: Array<abilities>;
  showSkill: boolean;
  isParentReady: boolean;
  closeFunction: () => void;
}

let initial = true;
const Abilities = (props: Props) => {

  const [divClassName, setDivClassName] = useState<string>("translate-x-p110");

  // Style of the main div
  const divStyle = `
      relative ease-in duration-300 
      z-40 bg-slate-100 rounded-2xl 
      p-5 pt-10 overflow-y-scroll h-full
      bg-opacity-95 xl:translate-x-0
      xl:w-11/12 xl:bg-opacity-25 
      xl:flex-1 xl:h-auto xl:overflow-y-scroll
    `;

  useEffect(() => {

    if (initial) {
      initial = false;
      return;
    }

    if (!props.isParentReady) {
      return;
    }

    if (props.showSkill) {
      setDivClassName(divStyle);

    } else {
      setDivClassName(`${divStyle} translate-x-p110`);
    }

  }, [props.showSkill, props.isParentReady]);


  const closeSkill = () =>{
    props.closeFunction();
  }

  let abilitiesKey = 0;
  return (
    <div className={divClassName}>
      <button
        type="button"
        onClick={closeSkill}
        className="absolute top-2 right-2 rounded-lg border-2 border-slate-500 text-slate-500 pl-1 pr-1 md:text-2xl md:right-7 md:top-9 xl:invisible"
      >
        close
      </button>

      <h1 className="pl-2 uppercase text-3xl text-slate-700 font-bold mb-3 md:text-4xl md:mb-5">
        Skills
      </h1>

      <ul>
        {props.abilities.map((ability) => {
          return (
            <Ability
              key={abilitiesKey++}
              ability={ability.ability}
              is_hidden={ability.is_hidden}
              slot={ability.slot}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Abilities;