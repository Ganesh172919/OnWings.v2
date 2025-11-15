import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  selectLastBooking, 
  clearBooking 
} from '../store/slices/bookingSlice'
import { addTrip } from '../store/slices/tripsSlice'
import { CheckCircle, Download, Plane } from 'lucide-react'
import FlightTicket from '../components/common/FlightTicket'
import { downloadTicketAsPDF } from '../utils/downloadTicket'
import { transformBookingToTrip } from '../utils/transformBookingToTrip'

const ConfirmationPage = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastBooking = useSelector(selectLastBooking);
  const ticketRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearBooking());
    }
  }, [dispatch]);

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;
    
    try {
      setIsDownloading(true);
      await downloadTicketAsPDF(ticketRef.current, bookingId);
      // Optional: Show success message
    } catch (error) {
      alert(error.message || 'Failed to download ticket. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!lastBooking || lastBooking.bookingId !== bookingId) {
    return (
      <div className="container mx-auto py-8 text-center text-white/90">
        <h2 className="text-2xl font-semibold">No confirmation found.</h2>
        <Link to="/" className="text-red-500 hover:underline">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 text-white/90">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h1 className="text-4xl font-bold mt-4">Booking Successful!</h1>
          <p className="text-lg text-gray-400">
            Your e-ticket has been generated.
          </p>
        </div>
        
        <div ref={ticketRef}>
          <FlightTicket booking={lastBooking} /> 
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <motion.button 
            className="bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            onClick={handleDownloadTicket}
            disabled={isDownloading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="h-5 w-5 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download Ticket'}
          </motion.button>
          
          <motion.button
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg"
            onClick={() => {
              // Use canonical transformer to ensure consistent trip shape
              const trip = transformBookingToTrip(lastBooking);
              dispatch(addTrip(trip));
              navigate('/my-trips');
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plane className="h-5 w-5 mr-2" />
            Save & View Trips
          </motion.button>
          
          <Link to="/" className="bg-gray-700 text-white/80 font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage