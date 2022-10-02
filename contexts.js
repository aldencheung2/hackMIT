import { createContext, useContext } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const contextValues = {};
  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export function useTransactionContext() {
  return useContext(Context);
}
