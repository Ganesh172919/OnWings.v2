import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArkDatePicker } from '../components/common/ArkDatePicker';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plane,
  Users,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react';

// Mock data for private aircraft
const privateAircraft = [
  {
    id: 1,
    name: 'Citation CJ3',
    type: 'Light Jet',
    capacity: '6-7 Passengers',
    image: '/images/citation-cj.png',
    description: 'Perfect for short to medium-range flights with superior comfort and speed.',
    features: ['WiFi', 'Refreshments', 'Leather Seats'],
    priceRange: '₹2.5L - ₹4L/hour',
  },
  {
    id: 2,
    name: 'Gulfstream G650',
    type: 'Heavy Jet',
    capacity: '14-18 Passengers',
    image: '/images/gulfstream.png',
    description: 'Ultimate luxury for long-range international travel with spacious cabin.',
    features: ['Full Galley', 'Private Suite', 'Conference Room', 'Entertainment System'],
    priceRange: '₹8L - ₹12L/hour',
  },
  {
    id: 3,
    name: 'King Air 350',
    type: 'Turboprop',
    capacity: '8-10 Passengers',
    image: '/images/king-air-350.png',
    description: 'Reliable and efficient for regional travel with excellent runway performance.',
    features: ['Pressurized Cabin', 'WiFi', 'Refreshments'],
    priceRange: '₹1.5L - ₹2.5L/hour',
  },
  {
    id: 4,
    name: 'Bell 407 Helicopter',
    type: 'Helicopter',
    capacity: '6 Passengers',
    image: '/images/bell-407-helicopter.png',
    description: 'Ideal for short-distance travel, city transfers, and scenic tours.',
    features: ['Leather Interior', 'Air Conditioning', 'Noise Reduction'],
    priceRange: '₹1L - ₹1.8L/hour',
  },
  {
    id: 5,
    name: 'Embraer Phenom 300',
    type: 'Light Jet',
    capacity: '7-9 Passengers',
    image: '/images/embreaer-phenom-300.png',
    description: 'Best-selling light jet with excellent range and modern avionics.',
    features: ['WiFi', 'Lavatory', 'Full Refreshment Service', 'Entertainment'],
    priceRange: '₹3L - ₹5L/hour',
  },
  {
    id: 6,
    name: 'Airbus H145 Helicopter',
    type: 'Helicopter',
    capacity: '8 Passengers',
    image: '/images/airbus-h-145-helicopter.png',
    description: 'Spacious twin-engine helicopter for VIP transport and corporate travel.',
    features: ['VIP Interior', 'Climate Control', 'Advanced Avionics', 'Quiet Cabin'],
    priceRange: '₹1.5L - ₹2.5L/hour',
  },
];

const PrivateBookingPage = () => {
  const { toast } = useToast();
  const formRef = useRef(null);
  const [tripType, setTripType] = useState('oneWay');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState('1');
  const [aircraftType, setAircraftType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRequestQuoteClick = (aircraft) => {
    const typeMap = {
      'Light Jet': 'jet',
      'Heavy Jet': 'jet',
      Turboprop: 'turboprop',
      Helicopter: 'helicopter',
    };
    if (typeMap[aircraft.type]) setAircraftType(typeMap[aircraft.type]);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    toast({
      title: 'Fill your details',
      description:
        'Please complete the flight details form. Our employee will contact you shortly.',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      tripType,
      fromLocation,
      toLocation,
      departureDate,
      returnDate,
      passengers,
      aircraftType,
    });
    // Show confirmation message
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Aviation Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Book Private Jet, Aircraft & Helicopter
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Experience luxury travel with our exclusive private aviation services. Fly on your schedule.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Booking Form Section */}
      <section ref={formRef} className="container mx-auto px-4 -mt-20 relative z-20 mb-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Card className="bg-black/80 backdrop-blur-lg border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Plane className="w-6 h-6 text-red-500" />
                Flight Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in your travel requirements for a personalized quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Trip Type */}
                <div>
                  <label className="text-white font-medium mb-2 block">Trip Type</label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={tripType === 'oneWay' ? 'default' : 'outline'}
                      onClick={() => setTripType('oneWay')}
                      className={tripType === 'oneWay' ? 'bg-red-600 hover:bg-red-700' : ''}
                    >
                      One Way
                    </Button>
                    <Button
                      type="button"
                      variant={tripType === 'roundTrip' ? 'default' : 'outline'}
                      onClick={() => setTripType('roundTrip')}
                      className={tripType === 'roundTrip' ? 'bg-red-600 hover:bg-red-700' : ''}
                    >
                      Round Trip
                    </Button>
                  </div>
                </div>

                {/* Location Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-medium mb-2 block flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      From
                    </label>
                    <Input
                      placeholder="Departure location"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      To
                    </label>
                    <Input
                      placeholder="Arrival location"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Date Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-medium mb-2 block flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Departure Date
                    </label>
                    <ArkDatePicker
                      date={departureDate}
                      setDate={setDepartureDate}
                      placeholder="Select departure date"
                    />
                  </div>
                  {tripType === 'roundTrip' && (
                    <div>
                      <label className="text-white font-medium mb-2 block flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Return Date
                      </label>
                      <ArkDatePicker
                        date={returnDate}
                        setDate={setReturnDate}
                        placeholder="Select return date"
                      />
                    </div>
                  )}
                </div>

                {/* Passengers and Aircraft Type */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-medium mb-2 block flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Number of Passengers
                    </label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      Aircraft Type
                    </label>
                    <Select value={aircraftType} onValueChange={setAircraftType}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select aircraft type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jet">Private Jet</SelectItem>
                        <SelectItem value="turboprop">Turboprop</SelectItem>
                        <SelectItem value="helicopter">Helicopter</SelectItem>
                        <SelectItem value="any">Any Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg"
                  size="lg"
                >
                  Get Personalized Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Confirmation Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6"
                  >
                    <Card className="bg-green-600/20 border-green-500/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <CheckCircle className="w-16 h-16 text-green-500" />
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              Details Received Successfully!
                            </h3>
                            <p className="text-gray-300">
                              We have received your details. Our employee will talk with you regarding the booking.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Why Choose Private Aviation */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Private Aviation?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the ultimate in luxury, flexibility, and convenience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <Clock className="w-10 h-10 text-red-500" />,
              title: 'Fly On Your Schedule',
              description: 'Depart and arrive at your convenience, no airline schedules',
            },
            {
              icon: <Shield className="w-10 h-10 text-red-500" />,
              title: 'Privacy & Security',
              description: 'Complete privacy with enhanced security protocols',
            },
            {
              icon: <Star className="w-10 h-10 text-red-500" />,
              title: 'Luxury Experience',
              description: 'Premium amenities and personalized service',
            },
            {
              icon: <Award className="w-10 h-10 text-red-500" />,
              title: 'Certified Operators',
              description: 'All aircraft operated by certified professionals',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 h-full hover:border-red-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Available Aircraft Section */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Premium Fleet
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our exclusive collection of private jets, aircraft, and helicopters
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privateAircraft.map((aircraft, index) => (
            <motion.div
              key={aircraft.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300 group h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={aircraft.image}
                    alt={aircraft.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-600/90 text-white border-0">
                    {aircraft.type}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    {aircraft.name}
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {aircraft.capacity}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-300 text-sm mb-4">{aircraft.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {aircraft.features.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-white/20 text-gray-300 text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <p className="text-red-500 font-bold mb-3">{aircraft.priceRange}</p>
                    <Button onClick={() => handleRequestQuoteClick(aircraft)} className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Request Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-red-600 to-orange-600 border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience Luxury Travel?
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Contact our aviation experts for a personalized quote and experience the freedom of private aviation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold">
                  Call Us: +91 98765 43210
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Schedule a Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    <Toaster />
    </div>
  );
};

export default PrivateBookingPage;
