// Declear types in the response of fetch single pokemon



type state = {
    name:string,
    url:string,
};

interface states {
    base_stat: number,
    effort: number,
    stat: state,
};

type ability = {
    name:string,
    url:string, 
};

interface abilities {
  ability: ability;
  is_hidden: boolean;
  slot: number;
};

type lang = {
    name:string,
    url:string, 
};

interface effectEntry  {
    effect: string;
    language: lang;
    short_effect: string
}

