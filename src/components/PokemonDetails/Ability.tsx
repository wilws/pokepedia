
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
    <li>
      Name : {name} <br />
      SHort Effect : {shortEffect} <br />
      Effect : {effect} <br />
    </li>
  );
};

export default Ability;

//    {
//      is_hidden;
//    }
//    {
//      slot;
//    }
