import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Calendar, 
  TrendingUp, 
  Search,
  Package,
  Plus
} from 'lucide-react';
import { selectPastTrips, addTrips } from '../store/slices/tripsSlice';
import { mockTrips } from '../data/mockTrips';
import TripsTimeline from '../components/trips/TripsTimeline';
import TripDetailDrawer from '../components/trips/TripDetailDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyTrips = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTrips = useSelector(selectPastTrips);
  
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showLoadSample, setShowLoadSample] = useState(false);

  useEffect(() => {
    // Auto-load mock trips once per browser if not already loaded
    try {
      const loaded = localStorage.getItem('ow_trips_mock_loaded');
      if (loaded !== '1') {
        dispatch(addTrips(mockTrips));
        localStorage.setItem('ow_trips_mock_loaded', '1');
      }
    } catch {}
    // If still empty (first visit, before dispatch resolves), show load option
    if (allTrips.length === 0) {
      setShowLoadSample(true);
    } else {
      setShowLoadSample(false);
    }
  }, [allTrips.length, dispatch]);

  useEffect(() => {
    // Apply filters
    let filtered = [...allTrips];

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(trip => trip.status === statusFilter);
    }

    // Search filter: city, code, airline, flightNo, bookingId
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(trip => (
        (trip.to?.city || '').toLowerCase().includes(q) ||
        (trip.from?.city || '').toLowerCase().includes(q) ||
        (trip.to?.code || '').toLowerCase().includes(q) ||
        (trip.from?.code || '').toLowerCase().includes(q) ||
        (trip.airline || '').toLowerCase().includes(q) ||
        (trip.flightNo || '').toLowerCase().includes(q) ||
        (trip.bookingId || '').toLowerCase().includes(q)
      ));
    }

    // Sort by departAt (date) newest -> oldest by default
    filtered.sort((a, b) => {
      const da = new Date(a.departAt).getTime();
      const db = new Date(b.departAt).getTime();
      return sortOrder === 'newest' ? db - da : da - db;
    });

    setFilteredTrips(filtered);
  }, [allTrips, statusFilter, searchQuery, sortOrder]);

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
    setIsDrawerOpen(true);
  };

  const handleLoadSampleData = () => {
    dispatch(addTrips(mockTrips));
    setShowLoadSample(false);
  };

  const totalSpent = allTrips.reduce((sum, trip) => sum + trip.amount, 0);
  const upcomingCount = allTrips.filter(trip => trip.status === 'Upcoming').length;
  const completedCount = allTrips.filter(trip => trip.status === 'Completed').length;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Empty State
  if (allTrips.length === 0 && !showLoadSample) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Package className="w-16 h-16 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">No Trips Yet</h2>
            <p className="text-lg text-slate-600 mb-8">
              Book your first flight to see trips here.
            </p>
            <Button
              onClick={() => navigate('/search')}
              size="lg"
              className="bg-red-600 hover:bg-red-700"
            >
              <Plane className="w-5 h-5 mr-2" />
              Book Your First Flight
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Show load sample data button
  if (showLoadSample) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Plane className="w-16 h-16 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome to My Trips</h2>
            <p className="text-lg text-slate-600 mb-8">
              No trips found. Load sample data to explore the experience, or book your first flight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleLoadSampleData}
                size="lg"
                variant="outline"
                className="border-slate-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Load Sample Data
              </Button>
              <Button
                onClick={() => navigate('/search')}
                size="lg"
                className="bg-red-600 hover:bg-red-700"
              >
                <Plane className="w-5 h-5 mr-2" />
                Book a Flight
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">MY TRIPS</h1>
            <p className="text-lg text-red-100 mb-6">
              Your complete travel history and upcoming journeys
            </p>

            {/* Status Tabs */}
            <div className="mt-4">
              <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList className="bg-white/15 backdrop-blur-sm">
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Completed">Completed</TabsTrigger>
                  <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <Plane className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-red-100">Total Trips</p>
                    <p className="text-2xl font-bold">{allTrips.length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-red-100">Total Spent</p>
                    <p className="text-2xl font-bold">{formatPrice(totalSpent)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8" />
                  <div>
                    <p className="text-sm text-red-100">Upcoming</p>
                    <p className="text-2xl font-bold">{upcomingCount}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Timeline (Left - Wider) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Journey Timeline</h2>
            {filteredTrips.length > 0 ? (
              <TripsTimeline 
                trips={filteredTrips} 
                onViewDetails={handleViewDetails}
              />
            ) : (
              <Card className="p-8 text-center">
                <p className="text-slate-600">No trips match your filters</p>
              </Card>
            )}
          </motion.div>

          {/* Filters & Stats Rail (Right) */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Filters Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Trips</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Search Trips</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="City, airline, flight no, booking id..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Sort</label>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest → Oldest</SelectItem>
                      <SelectItem value="oldest">Oldest → Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Completed</span>
                  <Badge className="bg-green-500">{completedCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Upcoming</span>
                  <Badge className="bg-blue-500">{upcomingCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Cancelled</span>
                  <Badge className="bg-red-500">
                    {allTrips.filter(t => t.status === 'Cancelled').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-red-50 to-slate-50">
              <CardContent className="p-6 text-center">
                <Plane className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">
                  Ready for your next adventure?
                </h3>
                <Button
                  onClick={() => navigate('/search')}
                  className="w-full bg-red-600 hover:bg-red-700 mt-2"
                >
                  Book New Flight
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Trip Detail Drawer */}
      <TripDetailDrawer
        trip={selectedTrip}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default MyTrips;
