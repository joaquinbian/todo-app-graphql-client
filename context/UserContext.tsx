import { createContext, useState } from "react";
import { User } from "../inrterfaces/userInterface";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

type UserContextType = {
  user: User | null;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const data: UserContextType = {
    user,
  };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
