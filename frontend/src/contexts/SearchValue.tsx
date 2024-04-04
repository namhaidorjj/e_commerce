/** @format */
import { ReactNode, useState } from "react";
import { createContext } from "react";
type ThemContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
const anhniUtga = {
  searchValue: "",
  setSearchValue: () => {},
};
type ChildrenType = {
  children: ReactNode;
};
export const SearchValueContext = createContext<ThemContextType>(anhniUtga);
export const SearchValue = ({ children }: ChildrenType) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchValueContext.Provider>
  );
};
