import React from 'react';
import { motion } from 'framer-motion';
import TripCardFrosted from './TripCardFrosted';

const TripsTimeline = ({ trips, onViewDetails }) => {
  const getAirlineColor = (airline) => {
    const colors = {
      'IndiGo': 'bg-blue-500',
      'Air India': 'bg-red-500',
      'Vistara': 'bg-purple-500',
      'SpiceJet': 'bg-orange-500',
    };
    return colors[airline] || 'bg-slate-500';
  };

  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {trips.map((trip, index) => (
          <div key={trip.bookingId} className="relative flex gap-6">
            {/* Timeline Node */}
            <div className="relative z-10 flex-shrink-0">
              <motion.div
                className={`w-12 h-12 rounded-full ${getAirlineColor(trip.airline)} flex items-center justify-center shadow-lg`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                {/* Pulse Animation */}
                <motion.div
                  className={`absolute inset-0 rounded-full ${getAirlineColor(trip.airline)} opacity-75`}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [1, 0.6, 1]
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Icon */}
                <span className="relative z-10 text-white text-xl">✈️</span>
              </motion.div>

              {/* Connector Line to Card */}
              <div className="absolute top-6 left-12 w-6 h-[2px] bg-slate-300" />
            </div>

            {/* Trip Card */}
            <div className="flex-1 pt-2">
              <TripCardFrosted 
                trip={trip} 
                index={index} 
                onViewDetails={onViewDetails}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SVG Animated Route (Optional decorative element) */}
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M 24 0 Q 24 ${trips.length * 100} 24 ${trips.length * 150}`}
          stroke="url(#routeGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default TripsTimeline;
