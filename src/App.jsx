import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import FlightLoader from "./components/common/FlightLoader";

const HomePage = lazy(() => import("./pages/HomePage"));
const LuggagePage = lazy(() => import("./pages/LuggagePage"));
const FlightSearchPage = lazy(() => import("./pages/FlightSearchPage"));
const FlightResultsPage = lazy(() => import("./pages/FlightResultsPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const ConfirmationPage = lazy(() => import("./pages/ConfirmationPage"));
const LoginModal = lazy(() => import("./components/auth/LoginModal"));
const SignupModal = lazy(() => import("./components/auth/SignupModal"));

function App() {
  return (
    <div className="app min-h-screen">
      <Navbar />
      <LoginModal />
      <SignupModal />
      <main className="pt-16">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
              <FlightLoader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/luggage" element={<LuggagePage />} />
            <Route path="/search" element={<FlightSearchPage />} />
            <Route path="/flights" element={<FlightResultsPage />} />
            <Route path="/book/:flightId" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route
              path="/confirmation/:bookingId"
              element={<ConfirmationPage />}
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
