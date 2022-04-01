import { User } from "../userInterface";

export interface SignInSignUpResponse {
  success: string;
  code: number;
  message: string;
  user: {
    user: User;
    token: string;
  };
}

export interface SignInVars {
  email: string;
  password: string;
}

export interface SignUpVars extends SignInVars {
  name: string;
}
