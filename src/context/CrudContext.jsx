import { createContext } from "react";

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  const value = {};
  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};

const useCrudContext = () => {
  return useContext(CrudContext);
};

export { CrudContextProvider, useCrudContext };
