import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./slices/flightSlice";
import bookingReducer from "./slices/bookingSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});
