import { UserState } from "./UserContext";
import { User } from "../inrterfaces/userInterface";

type ActionType = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export const userReducer = (
  state: UserState,
  action: ActionType
): UserState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
