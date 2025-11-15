// Utility: transforms a booking object into the MyTrips trip shape
// Does NOT alter original booking; returns a new object matching mockTrips.js

// Attempts to convert unknown time strings (e.g., "08:45 AM") into a valid ISO string
const toISO = (val) => {
  const direct = new Date(val);
  if (!isNaN(direct.getTime())) return direct.toISOString();
  const str = String(val || "");
  const m = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  const base = new Date();
  if (m) {
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const ap = m[3];
    if (ap) {
      const up = ap.toUpperCase();
      if (up === "PM" && h < 12) h += 12;
      if (up === "AM" && h === 12) h = 0;
    }
    base.setHours(h, min, 0, 0);
    return base.toISOString();
  }
  return base.toISOString();
};

const parseLocation = (val) => {
  const text = String(val || "").trim();
  const codeMatch = text.match(/\b[A-Z]{3}\b/);
  const code = codeMatch ? codeMatch[0] : (text.split(',').pop() || '').trim().toUpperCase().slice(0,3) || 'N/A';
  const city = (text.split(',')[0] || code || 'Unknown').trim();
  const airport = text || city;
  return { code, city, airport };
};

export const transformBookingToTrip = (booking) => {
  if (!booking) return null;
  const firstPassenger = booking.passengers?.[0] || {};
  const passenger = [firstPassenger.firstName, firstPassenger.lastName].filter(Boolean).join(' ').trim() || 'Passenger';
  const seat = booking.selectedSeat || booking.selectedSeats?.[0] || 'N/A';
  const flight = booking.flight || {};

  const fromLoc = parseLocation(flight.from);
  const toLoc = parseLocation(flight.to);

  return {
    bookingId: booking.bookingId,
    passenger,
    airline: flight.airline || 'OnWings',
    flightNo: String(flight.id || flight.flightNo || 'N/A'),
    from: fromLoc,
    to: toLoc,
    departAt: toISO(flight.departure),
    arriveAt: toISO(flight.arrival),
    amount: Number(booking.total || 0),
    seat,
    status: 'Upcoming',
  };
};

export default transformBookingToTrip;
