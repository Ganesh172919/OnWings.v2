import React from "react";
import LuggageInfo from "../components/booking/LuggageInfo";
import { motion } from "framer-motion";

const LuggagePage = () => {
  return (
    <div className="container mx-auto py-12">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LuggageInfo />
      </motion.div>
    </div>
  );
};

export default LuggagePage;
