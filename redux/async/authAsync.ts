import api from "@/api";
import { setAuthToken } from "@/api";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface ILoginForm {
  username: string;
  password: string;
}

export const loginAsync = createAsyncThunk("auth/login", async (credentials: ILoginForm, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    const token = response.data.token;
    const user = response.data.user;
    setAuthToken(token);
    localStorage.setItem("token", token);
    return { token: token, user: user };
  } catch (error) {
    return rejectWithValue("error");
  }
});
