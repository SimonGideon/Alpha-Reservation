import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  housesList: [],
  currentHouse: {},
  isLoading: false,
};

export const fetchHouses = createAsyncThunk('houses/fetchHouses',
  async () => {
    const response = await axios('http://localhost:3000/houses');
    return response.data;
  });

export const fetchHouse = createAsyncThunk('houses/fetchHouse',
  async (id) => {
    const response = await axios(`http://localhost:3000/houses/${id}`);
    return response.data;
  });

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchHouses.fulfilled, (state, action) => ({
        ...state,
        housesList: action.payload,
        isLoading: false,
      }))
      .addCase(fetchHouses.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));

    builder
      .addCase(fetchHouse.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchHouse.fulfilled, (state, action) => ({
        ...state,
        currentHouse: action.payload,
        isLoading: false,
      }))
      .addCase(fetchHouse.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default housesSlice.reducer;
