import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
  reducers: {
    fetchItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchItemSuccess: (state, action: PayloadAction<Item[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchItemStart, fetchItemSuccess, fetchItemFailure } = itemSlice.actions;
export default itemSlice.reducer;
