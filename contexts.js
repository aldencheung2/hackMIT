import { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { User, SelectOption, Transaction } from "../Interfaces";
import { SingleValue } from "chakra-react-select";
import { FieldInputProps } from "formik";
import { useAuthContext } from "./authContext";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const contextValues = {};
  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export function useTransactionContext() {
  return useContext(Context);
}
