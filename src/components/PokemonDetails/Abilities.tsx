import { useEffect, useState } from "react";
import Ability from "./Ability";
import { useRouter } from "next/router";


interface Props {
  abilities: Array<abilities>;
  showSkill: boolean;
  closeFunction: ()=>void
}

const Abilities = (props: Props) => {

  const router = useRouter();
  const [divClassName, setDivClassName] = useState<string>("translate-x-p110");

  // Style of the main div
  const divStyle = `relative ease-in duration-300 
     z-40 bg-slate-100/25 rounded-2xl p-5 pt-10 overflow-y-scroll h-1/2
     shadow-lg shadow-gray-800/50
    
     `;
  useEffect(() => {

    if (props.showSkill) {
      setDivClassName(divStyle);
    } else {
      setDivClassName(`${divStyle} translate-x-p110`);
    }
  }, [props.showSkill]);

  const closeSkill = () =>{
    props.closeFunction();
  }


 
  let abilitiesKey = 0;
  return (
    <div className={divClassName}>
      <button
        type="button"
        onClick={closeSkill}
        className="absolute top-2 right-2 rounded-lg border-2 border-slate-500 text-slate-500 pl-1 pr-1"
      >
        close
      </button>

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