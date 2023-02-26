import {useState, useRef, useEffect} from "react";
import {
  setShadowDataPool,
  setSearchMode,
  switchToDataPool,
  restShadowPool,
} from "@/store/pokemons-slice";


import { useAppDispatch } from "../../store/";

let initial = true;
const SearchBar = () => {

    const [inputValue, setInputValue ] = useState<string>('');
    const dispatch = useAppDispatch()
    

    // Set Debouncing prevent trigger in every onChange.
    useEffect(() => {

        if (initial){
            initial = false;
            return;
        };
        if (inputValue.length === 0) {

            dispatch(setSearchMode(false));
            dispatch(switchToDataPool());
            dispatch(restShadowPool());
            return 
        
        } else {
            const identifier = setTimeout(() => {
        
                dispatch(setSearchMode(true));
                dispatch(setShadowDataPool(inputValue));
            }, 300);

            return () => {
            clearTimeout(identifier);
            };
        }
    }, [inputValue]);


    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
      <div className="w-ful h-12 box-border  pt-2 pb-2 md:h-14 lg:w-5/12 lg:flex-none">
        <input
          className="bg-slate-300 w-full rounded-3xl h-full focus:ring focus:ring-black-300 focus:outline-none pl-3 pr-3 text-center"
          type="text"
          value={inputValue}
          placeholder="search by pokemon's name here"
          onChange={onChangeHandler}
        />
      </div>
    );

}

export default SearchBar;