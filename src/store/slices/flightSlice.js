import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockFlightApi } from '../../data/mockFlights'

// This is an async it handles the API call
export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (searchParams) => {
    console.log("Fetching flights with params:", searchParams);
    const response = await mockFlightApi(searchParams);
    return response; 
  }
)

const initialState = {
  flights: [],     
  searchParams: {}, 
  status: 'idle',    
  error: null,
};

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    clearFlights: (state) => {
      state.flights = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state, action) => {
        state.status = 'loading';

        state.searchParams = action.meta.arg; 
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearFlights } = flightSlice.actions;

// Selectors to pull data from the store in your components
export const selectAllFlights = (state) => state.flights.flights;
export const selectFlightsStatus = (state) => state.flights.status;
export const selectSearchParams = (state) => state.flights.searchParams;

export const selectFlightsError = (state) => state.flights.error;
export default flightSlice.reducer;