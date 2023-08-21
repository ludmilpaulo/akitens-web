import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  user_id?: number;
  username: string;
  nome_fornecedor: string;
  telefone: string;
  endereco: string;
  email: string;
  logo: string;
  licenca: string;
};

const initialState: { user: User | null } = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export const selectUser = (state: { auth: { user: User | null } }) => state.auth.user;

export default authSlice.reducer;
