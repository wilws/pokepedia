
export const getImage = (id: string) : string => {
    const imageLocation = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    const ext = ".png"
    return `${imageLocation}${id}${ext}`;
};

export const extractId = (url: string) : string => {
  return url.split("/")[6];
};

export type getAbilityDescriptionReturn = {
  effect: string,
  short_effect: string,
};

export const getAbilityDescription = (
  effectEntries: Array<effectEntry>,
  lang: string = "en"
): getAbilityDescriptionReturn => {
  const result = {
    effect: "",
    short_effect: "",
  };

  for (let i = 0; i < effectEntries.length; i++) {
    if (effectEntries[i].language.name === lang) {
      result.effect = effectEntries[i].effect;
      result.effect = effectEntries[i].effect;
      result.short_effect = effectEntries[i].short_effect;
      break;
    }
  }

  return result;
};