// types.ts

export type AuthState = {
  isAuthenticated: boolean;
  user: null | {
    username: string;
    nome_fornecedor: string;
    telefone: string;
    endereco: string;
    email: string;
    logo: string;
    licenca: string;
  };
  error: string | null;
};

export enum AuthActionTypes {
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNIN_SUCCESS = "SIGNIN_SUCCESS",
  AUTH_ERROR = "AUTH_ERROR",
}

export interface RootState {
  auth: AuthState;
}
