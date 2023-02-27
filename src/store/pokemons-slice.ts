import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type PokemonNameAndUrl = {
    name: string,
    url: string,
};

interface fetchingReturnObj {
  next: string | null;
  previous: string | null;
  count: number;
  results: Array<PokemonNameAndUrl>;
}

type dataObj = {
  recordNo: number;
  data: Array<PokemonNameAndUrl>;
};

type shadowDataObj = {
  recordNo: number;
  data: Array<PokemonNameAndUrl>;
  next: string | null;
};

interface PokemonsObj {
  next: string | null;
  previous: string | null;
  supplier: dataObj; // supply data to display on screen
  dataPool: dataObj; // store all the data including those not on screen
  shadowDataPool: shadowDataObj; // store all filltered data including those not on screen
  searchMode: boolean;
}

const initialState: PokemonsObj = {
  next: null,
  previous: null,
  supplier: { recordNo: 0, data: [] },
  dataPool: { recordNo: 0, data: [] },
  shadowDataPool: { recordNo: 0, data: [],next:null },
  searchMode: false,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    setDataPool: (state, action: PayloadAction<fetchingReturnObj>) => {
      // Put fetched data to dataPool

      const PokemonNameAndUrlObj = action.payload;
      state.next = PokemonNameAndUrlObj.next;
      state.previous = PokemonNameAndUrlObj.previous;
      state.dataPool.data = PokemonNameAndUrlObj.results;
      state.dataPool.recordNo = state.dataPool.data.length;
    },

    extractDataFromPool: (state, action: PayloadAction<boolean>) => {
      // Extract data from dataPool to supplier
      const isInitialFetch = action.payload;
      let startIndex = 0;
      let getItemNo = 50;

      if (!isInitialFetch) {
        startIndex = state.supplier.data.length;
      }

      let endIndex = startIndex + getItemNo;
      state.supplier.data = [
        ...state.supplier.data,
        ...state.dataPool.data.slice(startIndex, endIndex),
      ];
      state.supplier.recordNo += getItemNo;
     
    },

    switchToDataPool: (state) => {
      let startIndex = 0;
      let getItemNo = 50;

      let endIndex = startIndex + getItemNo;
      (state.supplier.data = state.dataPool.data.slice(startIndex, endIndex)),
        (state.supplier.recordNo += getItemNo);
    },

    setSearchMode: (state, action: PayloadAction<boolean>) => {
      state.searchMode = action.payload;
    },

    updateShadowPool: (state, action: PayloadAction<shadowDataObj>) => {
      state.shadowDataPool = { ... action.payload };
      state.supplier.data = state.shadowDataPool.data;
      state.supplier.recordNo = state.shadowDataPool.recordNo;
    },

    restShadowPool: (state) => {
      state.shadowDataPool.recordNo = 0;
      state.shadowDataPool.data = [];
    },

    resetData: (state) => {
      state.next = null;
      state.previous = null;
      state.supplier.recordNo = 0;
      state.supplier.data = [];
      state.dataPool.recordNo = 0;
      state.dataPool.data = [];
      state.shadowDataPool.recordNo = 0;
      state.shadowDataPool.data = [];
      state.searchMode = false;
    },
  },
});


export const {
  updateShadowPool,
  switchToDataPool,
  resetData,
  setDataPool,
  setSearchMode,
  restShadowPool,
  extractDataFromPool,
} = pokemonSlice.actions;
export const selectPokemonsObj = (state: RootState) => state.pokemon;
export const getDataSupplier = (state: RootState) => state.pokemon.supplier;
export const getDataPool = (state: RootState) => state.pokemon.dataPool;
export const getPreviousLink = (state: RootState) => state.pokemon.previous;
export const getNextLink = (state: RootState) => state.pokemon.next;
export const getSearchMode = (state: RootState) => state.pokemon.searchMode;


export default pokemonSlice.reducer;



// Thunks for async function : 

// Thunk: Fetch Pokemon at the landing page
export const fetchInitialPokemonList = () => {

  return async (dispatch: any) => {
    dispatch(resetData());
    const url = "https://pokeapi.co/api/v2/pokemon?limit=151";

    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    try {
      const pokemonData = await fetchData();
      dispatch(setDataPool(pokemonData));
      dispatch(extractDataFromPool(true));
    } catch (err) {
      console.log(err);
    }
  };
};


// Thunk: Load more from pool to supplier when scroll to certian point
export const LoadDataFromPool = () => {

  return async (dispatch:any, getState:() => RootState) => {
    
    // Check if 80% extraction from Pool, if yes, send get request to fetch more
    const recordNoInSupplier = getState().pokemon.supplier.recordNo;
    const recordNoInPool = getState().pokemon.dataPool.recordNo;
    if (recordNoInSupplier/recordNoInPool > 0.8) {
      
      // fetch from Api. Increase more data from pool
      const url = getState().pokemon.next;
      if (!url) return;
      const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      };

      try {
        const pokemonData = await fetchData();
        const results = getState().pokemon.dataPool.data.concat(
          pokemonData.results
        );
        const newPokemonData = {
          ...pokemonData,
          results,
        };
        
      dispatch(setDataPool(newPokemonData));
      dispatch(extractDataFromPool(false));
  
      } catch (err) {
        console.log(err);
        dispatch(extractDataFromPool(false));
      };

    } else {     
      dispatch(extractDataFromPool(false));
    }
  };
};


// Thunk: extract data from shadow data pool
export const setShadowDataPool = (searchWords:string) => {
  // copy data in data pool to shadow data pool
  return async (dispatch: any, getState: () => RootState) => {
    
    if (searchWords.length === 0) return;

    const shadowDataPool: shadowDataObj = { data: [], recordNo: 0, next:null };
    const dataPool = getState().pokemon.dataPool;
    const _arr = dataPool.data.filter((data) => {
      return (data.name.indexOf(searchWords.toLowerCase()) != -1);
    });
 
    shadowDataPool.data = _arr;
    shadowDataPool.recordNo = shadowDataPool.data.length;
    shadowDataPool.next = getState().pokemon.next;
    dispatch(updateShadowPool(shadowDataPool));
  }
}


// Thunk: Fetch data from server when search bar is on
// export const LoadDataFromShadowPool = () => {
  // Fetch data from server when search bar is on
// };


// Thunk: Fetch Single Pokemon data
export const fetchSinglePokemonData = (id:string) => {

  return async (dispatch: any) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    try {
      const res = {
        abilities: [],
        stats: [],
        name: '',
      };
      const pokemonData = await fetchData();
      res.abilities = pokemonData.abilities;
      res.stats = pokemonData.stats;
      res.name = pokemonData.name;
      return res;

    } catch (err) {
      console.log(err);
    }
  };
};


// Thunk: Fetch Single Pokemon's ability data
export const fetchAbilityData = (url: string)=> {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    try {
      const res = {
        effectEntries: [],
        name: '',
      }
      const pokemonData = await fetchData();
      res.effectEntries = pokemonData.effect_entries;
      res.name = pokemonData.name;
      return res;
    
    } catch (err) {
      console.log(err);
    }
  };
};
