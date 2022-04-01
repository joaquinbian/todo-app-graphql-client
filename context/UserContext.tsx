import React, { createContext, useReducer } from "react";
import { User } from "../inrterfaces/userInterface";
import { userReducer } from "./userReducer";
import * as SecureStore from "expo-secure-store";

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface UserState {
  user: User | null;
}

interface AuthContext {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const initialState: UserState = {
  user: null,
};

const obj = {
  name: "",
  surname: "",
};

export const UserContext = createContext({} as AuthContext);

export const UserProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (user: User, token: string) => {
    await SecureStore.setItemAsync("token", token);
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch({ type: "LOGOUT" });
  };

  const data: AuthContext = {
    user: state.user,
    login,
    logout,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
