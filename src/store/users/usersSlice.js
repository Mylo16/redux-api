import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://randomuser.me/api/?results=10';
export const fetchData = createAsyncThunk('store/users', async () => {
  try {
    const response = await fetch(url);
    const res = await response.json();
    return res;
  }
  catch (err) {
    throw new Error('Failed to fetch data');
  }
})
const initialState = {
  users: [],
  isLoading: true,
  error: undefined,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;