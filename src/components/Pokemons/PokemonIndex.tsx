import PokemonList from "./PokemonList"

import Header from "./PokemonHeader";


const PokemonIndex = () => {

    return (
      <div className="bg-zinc-50 h-screen pl-4 pr-4">

        <Header />
       
        <PokemonList />
      </div>
    );

    

}

export default PokemonIndex;