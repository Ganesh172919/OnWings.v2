import React from "react";
import FlightSearchForm from "../components/flight/FlightSearchForm";
import { motion } from "framer-motion";

const FlightSearchPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-3xl w-full mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Find Your Perfect Flight
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your travel details to begin your journey.
        </p>
        <FlightSearchForm />
      </motion.div>
    </div>
  );
};

export default FlightSearchPage;
