import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, Clock, CreditCard, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const TripCardFrosted = ({ trip, index, onViewDetails }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Upcoming':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const getAirlineColor = (airline) => {
    const colors = {
      'IndiGo': 'from-blue-500 to-blue-600',
      'Air India': 'from-red-500 to-red-600',
      'Vistara': 'from-purple-500 to-purple-600',
      'SpiceJet': 'from-orange-500 to-orange-600',
    };
    return colors[airline] || 'from-slate-500 to-slate-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -6,
        transition: { duration: 0.3 }
      }}
      className="relative"
    >
      <Card className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Left Column: Route & Airline */}
          <div className="flex-1 space-y-3">
            {/* Route */}
            <div className="flex items-center gap-3">
              <div className="text-left">
                <p className="text-2xl font-bold text-slate-900">{trip.from.code}</p>
                <p className="text-xs text-slate-600">{trip.from.city}</p>
              </div>
              
              <div className="flex-1 flex items-center justify-center px-2">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300" />
                <Plane className="w-5 h-5 text-slate-500 mx-2 rotate-90" />
                <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300" />
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{trip.to.code}</p>
                <p className="text-xs text-slate-600">{trip.to.city}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                className={`bg-gradient-to-r ${getAirlineColor(trip.airline)} text-white border-0 px-3 py-1`}
              >
                {trip.airline}
              </Badge>
              <Badge 
                variant="outline" 
                className={getStatusColor(trip.status)}
              >
                {trip.status}
              </Badge>
            </div>
          </div>

          {/* Right Column: Details & CTA */}
          <div className="flex flex-col justify-between items-end space-y-3">
            {/* Date & Time */}
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{formatDate(trip.departAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(trip.departAt)} - {formatTime(trip.arriveAt)}</span>
              </div>
            </div>

            {/* Amount & Seat */}
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <CreditCard className="w-4 h-4" />
                <span>{formatPrice(trip.amount)}</span>
              </div>
              <p className="text-xs text-slate-600">Seat: {trip.seat}</p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => onViewDetails(trip)}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white shadow-md"
            >
              View Ticket
            </Button>
          </div>
        </div>

        {/* Booking ID */}
        <div className="mt-4 pt-3 border-t border-slate-200/50">
          <p className="text-xs text-slate-500">
            Booking ID: <span className="font-mono font-semibold text-slate-700">{trip.bookingId}</span>
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default TripCardFrosted;
