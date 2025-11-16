import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastTrips: [],
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addTrip: (state, action) => {
      const trip = action.payload;
      const exists = state.pastTrips.some(t => t.bookingId === trip.bookingId);
      if (!exists) {
        state.pastTrips.unshift(trip); 
      }
    },
    addTrips: (state, action) => {
      const trips = action.payload;
      trips.forEach(trip => {
        const exists = state.pastTrips.some(t => t.bookingId === trip.bookingId);
        if (!exists) {
          state.pastTrips.push(trip);
        }
      });
    },
    clearTrips: (state) => {
      state.pastTrips = [];
    },
  },
});

export const { addTrip, addTrips, clearTrips } = tripsSlice.actions;

// Selectors
export const selectPastTrips = (state) => state.trips.pastTrips;

export const selectTripsByStatus = (status) => (state) => {
  if (status === "All") return state.trips.pastTrips;
  return state.trips.pastTrips.filter(trip => trip.status === status);
};

// Reducer
export default tripsSlice.reducer;
