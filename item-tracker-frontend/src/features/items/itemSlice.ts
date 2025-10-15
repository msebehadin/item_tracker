import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
const fetchItems=createAsyncThunk('items/fetchItems', async () => {
   const response = await api.get('http://localhost:4000/api/items');
  const data = await response.data();
  return data; 
})

interface Item {
  name: string;
  id: string;
  category: string;
  stock: number;
}

interface ItemState {
  items: Item[];
  loading: boolean;
  error: null | string;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      }
      )
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch items";
      })
  }
})
   

export default itemSlice.reducer;