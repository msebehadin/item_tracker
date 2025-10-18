import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await api.post('http://localhost:4000/api/items');
  const data = response.data();
  return data;
})
interface User{
  email: string;
  password: string;
}
interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  user:User[]
}

const initialState: AuthState = {
  user:[],
  token: localStorage.getItem("token"),
   loading: false,
  error:   null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logoutUser(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch the user";
    })
  }
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
