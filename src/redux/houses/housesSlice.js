import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
<<<<<<< HEAD
import { backendLink } from '../../constants';
=======

const backendLink = 'https://rails-uaii.onrender.com/';
>>>>>>> 290b6f6b0e3014115ab48fa407f3bd17df2dee8a

const initialState = {
  housesList: [],
  currentHouse: {},
  isLoading: false,
  status: null,
};

export const fetchHouses = createAsyncThunk(
  'houses/fetchHouses',
  async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${backendLink}houses`, {
      headers: {
        authorization: token, // Include the token in the Authorization header
      },
    });
    return response.data;
  },
);

export const createHouse = createAsyncThunk(
  'houses/createHouse',
  async (houseData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${backendLink}houses`, houseData, {
      headers: {
        authorization: token, // Include the token in the Authorization header
      },
    });
    return response.data;
  },
);

export const fetchHouse = createAsyncThunk('houses/fetchHouse',
  async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios(`${backendLink}houses/${id}`, {
      headers: {
        authorization: token, // Include the token in the Authorization header
      },
    });
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
    builder
      .addCase(createHouse.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(createHouse.fulfilled, (state, action) => ({
        ...state,
        housesList: [...state.housesList, action.payload],
        isLoading: false,
      }))
      .addCase(createHouse.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default housesSlice.reducer;
