
import { fetchAbilityData } from "@/store/pokemons-slice";
import { useAppDispatch } from "../../store";
import { useEffect, useState } from "react";
import {getAbilityDescription} from "../../utils/utils";

const Ability = (props: abilities) => {
  const { ability, is_hidden, slot } = props;
    const dispatch = useAppDispatch();
    const [effect,setEffect] = useState<string>('');
    const [shortEffect, setShortEffect] = useState<string>("");
    const [name, setName] = useState<string>("");


  useEffect(() => {
    dispatch(fetchAbilityData(ability.url))
      .then((abilityData) => {
        if (!abilityData?.effectEntries.length || !abilityData?.name.length) {
          return Promise.reject("No Data Fetched");
        }

        const entry = getAbilityDescription(abilityData.effectEntries, "en");
        if (entry.effect && entry.short_effect) {
          setEffect(entry.effect);
          setShortEffect(entry.short_effect);
          setName(abilityData.name);
        } else {
          return Promise.reject("entries language not found");
        }
      })
      .catch((err) => {
        // do error handling
        console.log(err);
      });
  },[]);

  return (
    <li className="relative mb-5 p-2">
      <h4 className="uppercase font-bold text-gray-600">{name}</h4>
      <p className="text-gray-600 leading-5">{effect} </p>
      <div className="mt-2">
        <h5 className="text-red-600 text-sm">Short Effect</h5>
        <p className="leading-5 text-gray-600 text-sm">{shortEffect}</p>
      </div>
    </li>
  );
};

export default Ability;

