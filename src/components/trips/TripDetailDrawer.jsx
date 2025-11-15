import React from 'react';
import { X, Download } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TripDetailDrawer = ({ trip, isOpen, onClose }) => {
  if (!trip) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
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

  const handleDownload = () => {
    // Placeholder for download functionality
    alert('Download functionality would be implemented here');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Flight Ticket</span>
            <Badge variant="outline" className={getStatusColor(trip.status)}>
              {trip.status}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Ticket Content - Similar to FlightTicket component */}
        <div className="mt-6 space-y-6">
          {/* Booking Header */}
          <div className="bg-gradient-to-br from-red-50 to-slate-50 p-6 rounded-xl border-2 border-red-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-red-600">OnWings</h3>
                <p className="text-sm text-slate-600 mt-1">Your E-Ticket</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Booking ID</p>
                <p className="text-lg font-mono font-bold text-red-600">{trip.bookingId}</p>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Passenger</p>
              <p className="text-lg font-semibold text-slate-900">{trip.passenger}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Flight</p>
                <p className="text-base font-medium text-slate-800">{trip.airline} {trip.flightNo}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Seat</p>
                <p className="text-base font-medium text-slate-800">{trip.seat}</p>
              </div>
            </div>
          </div>

          {/* Flight Route */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 mb-1">From</p>
                <p className="text-3xl font-bold text-slate-900">{trip.from.code}</p>
                <p className="text-sm text-slate-600 mt-1">{trip.from.city}</p>
                <p className="text-xs text-slate-500">{trip.from.airport}</p>
                <p className="text-sm font-medium text-slate-700 mt-2">{formatTime(trip.departAt)}</p>
              </div>
              
              <div className="text-center px-4">
                <div className="text-4xl">✈️</div>
                <p className="text-xs text-slate-500 mt-2">Direct</p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">To</p>
                <p className="text-3xl font-bold text-slate-900">{trip.to.code}</p>
                <p className="text-sm text-slate-600 mt-1">{trip.to.city}</p>
                <p className="text-xs text-slate-500">{trip.to.airport}</p>
                <p className="text-sm font-medium text-slate-700 mt-2">{formatTime(trip.arriveAt)}</p>
              </div>
            </div>
          </div>

          {/* Travel Date */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-600 mb-1">Travel Date</p>
            <p className="text-base font-semibold text-blue-900">{formatDate(trip.departAt)}</p>
          </div>

          {/* Pricing */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-green-600 mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-green-900">{formatPrice(trip.amount)}</p>
              </div>
              <Badge className="bg-green-600 text-white">Paid</Badge>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center py-4 border-t border-dashed border-slate-300">
            <p className="text-sm font-medium text-slate-700">Thank you for flying with OnWings!</p>
            <p className="text-xs text-slate-500 mt-1">Have a safe journey</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleDownload}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TripDetailDrawer;
