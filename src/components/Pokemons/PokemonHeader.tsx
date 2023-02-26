import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <header className="w-full  lg:flex lg:justify-between lg:items-end">
      <div className="text-center mb-2 pt-4 md:pt-9 lg:text-left lg:flex-none">
        <h1 className="font-mono text-3xl uppercase w-full tracking-wide font-bold md:text-6xl">
          Poké-Pedia
        </h1>
        <h2 className="-mt-2 font-sans text-sm tracking-wide w-full md:text-3xl">
          Technical Test of Heatable
        </h2>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
