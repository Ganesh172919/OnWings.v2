import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./slices/flightSlice";
import bookingReducer from "./slices/bookingSlice";
import userReducer from "./slices/userSlice";
import filterReducer from "./slices/filterSlice";
import tripsReducer from "./slices/tripsSlice";

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    booking: bookingReducer,
    user: userReducer,
    filters: filterReducer,
    trips: tripsReducer,
  },
});
