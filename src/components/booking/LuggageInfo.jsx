import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExtraBaggage,
  selectExtraBaggage,
} from "../../store/slices/bookingSlice";
import { Briefcase, ShoppingBag, X, CheckCircle, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const baggageOptions = [
  { weight: "5kg", price: 1500 },
  { weight: "10kg", price: 2500 },
  { weight: "15kg", price: 3500 },
];

const LuggageInfo = () => {
  const dispatch = useDispatch();
  const savedBaggage = useSelector(selectExtraBaggage);

  const [showExtra, setShowExtra] = useState(false);
  const [selectedBaggage, setSelectedBaggage] = useState(savedBaggage);

  useEffect(() => {
    setSelectedBaggage(savedBaggage);
  }, [savedBaggage]);

  const extraBaggagePrice = selectedBaggage ? selectedBaggage.price : 0;

  const handleSelectBaggage = (option) => {
    setSelectedBaggage(option);
  };

  const handleSaveBaggage = () => {
    dispatch(addExtraBaggage(selectedBaggage));
    setShowExtra(false);
  };

  const handleCancel = () => {
    setSelectedBaggage(savedBaggage); // Revert to last saved state
    setShowExtra(false);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="bg-black/80 border border-red-800/50 p-6 rounded-none shadow-lg text-white/90">
      <h2 className="text-2xl font-semibold mb-6 border-b border-red-800/50 pb-4">
        Baggage Allowance
      </h2>
      <div className="space-y-4">
        {/* Included Baggage */}
        <div className="flex items-center justify-between p-4 bg-black/50 rounded-md">
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-red-500" />
            <div>
              <h3 className="font-semibold">Carry-On Bag</h3>
              <p className="text-sm text-white/60">1x 7kg bag (max 55cm)</p>
            </div>
          </div>
          <span className="font-semibold text-green-500">Included</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-black/50 rounded-md">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-red-500" />
            <div>
              <h3 className="font-semibold">Checked Bag</h3>
              <p className="text-sm text-white/60">1x 15kg bag</p>
            </div>
          </div>
          <span className="font-semibold text-green-500">Included</span>
        </div>

        {/* Saved Baggage Summary */}
        {savedBaggage && !showExtra && (
          <div className="flex items-center justify-between p-4 bg-red-900/30 rounded-md border border-red-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="font-semibold">Extra Baggage Added</h3>
                <p className="text-sm text-white/60">
                  {savedBaggage.weight} - {formatPrice(savedBaggage.price)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowExtra(true)}
              className="flex items-center text-sm text-red-400 hover:text-white"
            >
              <Edit size={16} className="mr-1" />
              Change
            </button>
          </div>
        )}

        {/* Add Baggage Button */}
        {!savedBaggage && !showExtra && (
          <button
            onClick={() => setShowExtra(true)}
            className="text-sm text-red-500 hover:text-red-400 transition-colors"
          >
            + Add extra baggage
          </button>
        )}

        {/* Baggage Selection Panel */}
        <AnimatePresence>
          {showExtra && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-red-800/50 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">
                  Purchase Extra Baggage
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 mb-4">
                {baggageOptions.map((option) => (
                  <div
                    key={option.weight}
                    onClick={() => handleSelectBaggage(option)}
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-all border ${
                      selectedBaggage?.weight === option.weight
                        ? "bg-red-600/50 border-red-500"
                        : "bg-black/40 border-transparent hover:bg-black/60"
                    }`}
                  >
                    <span>{option.weight} Extra</span>
                    <span className="font-mono">
                      {formatPrice(option.price)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-red-800/50">
                <span>Total Extra Cost:</span>
                <span className="font-mono text-red-500">
                  {formatPrice(extraBaggagePrice)}
                </span>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={handleSaveBaggage}
                  disabled={!selectedBaggage}
                  className="bg-red-700 text-white font-bold py-2 px-6 rounded-none transition duration-200 hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center ml-auto"
                >
                  Save Baggage
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LuggageInfo;
