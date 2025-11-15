import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import FlightSearchForm from '../components/flight/FlightSearchForm'

// --- ASSET IMPORTS ---
import HeroImage from '../assets/hero-background.jpg' // This is unused, but fine to leave
import MumbaiImg from '../assets/mumbai.jpg'
import DubaiImg from '../assets/dubai.jpg'
import BangaloreImg from '../assets/bangalore.jpg'
import GoaImg from '../assets/goa.jpg'
import KolkataImg from '../assets/kolkata.jpg'
import ChennaiImg from '../assets/chennai.jpg'

import { FloatingPaths } from '../components/common/FloatingPaths'
import { ExpandingGallery } from '../components/common/ExpandingGallery'
import WarpBackground from '../components/common/WarpBackground'

// --- SHADCN IMPORTS ---
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// --- ICON IMPORTS ---
import { 
  Zap, ShieldCheck, DollarSign, Award, 
  Brain, Eye, Calculator, Headphones,
  Plane, Star, Quote, Mail, ArrowRight,
  Sparkles, Globe, Clock, Users
} from 'lucide-react'

// --- MOCK DATA ---
const popularDestinations = [
  { city: 'Mumbai', price: '4,500', image: MumbaiImg },
  { city: 'Dubai', price: '12,800', image: DubaiImg }, // <-- FIX: Changed 'Delhi' to 'Dubai'
  { city: 'Bangalore', price: '6,200', image: BangaloreImg },
  { city: 'Goa', price: '3,800', image: GoaImg },
  { city: 'Kolkata', price: '5,100', image: KolkataImg },
  { city: 'Chennai', price: '4,200', image: ChennaiImg },
];

const galleryItems = popularDestinations.map(dest => ({
  common: dest.city,
  binomial: `Flights from ₹${dest.price}`, // Use this for the italic text
  photo: {
    url: dest.image,
    text: `Photo of ${dest.city}`,
    by: 'OnWings Travel', // Add a placeholder 'by'
    pos: 'center'
  }
}));

// Data for the "Why Choose Us" section
const features = [
  { icon: <Zap className="w-8 h-8 text-red-500" />, title: 'Instant Booking', description: 'Book your flight in seconds with our seamless checkout.'},
  { icon: <DollarSign className="w-8 h-8 text-red-500" />, title: 'Best Price Guarantee', description: "We find the best deals, so you don't have to."},
  { icon: <ShieldCheck className="w-8 h-8 text-red-500" />, title: 'Secure Payments', description: 'Your data is protected by industry-standard security.'},
  { icon: <Award className="w-8 h-8 text-red-500" />, title: 'Award Winning', description: 'Trusted by over 1 million passengers worldwide.'},
];


// Airlines logos (placeholder - replace with actual logo paths)
const partnerAirlines = [
  { name: 'Emirates', logo: '🛫' },
  { name: 'Qatar Airways', logo: '✈️' },
  { name: 'Indigo', logo: '🛩️' },
  { name: 'Vistara', logo: '🛬' },
  { name: 'Singapore Airlines', logo: '✈️' },
  { name: 'Air India', logo: '🛫' },
];

// Testimonials data
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Frequent Traveler',
    content: 'OnWings transformed my booking experience. The AI fare predictor saved me ₹5,000 on my Dubai trip!',
    rating: 5,
    avatar: '👩'
  },
  {
    name: 'Rahul Mehta',
    role: 'Business Executive',
    content: 'Seamless, fast, and reliable. I book all my business trips through OnWings now.',
    rating: 5,
    avatar: '👨'
  },
  {
    name: 'Ananya Iyer',
    role: 'Travel Blogger',
    content: 'The user experience is phenomenal. Best flight booking platform I have used.',
    rating: 5,
    avatar: '👧'
  },
];

// --- ANIMATION VARIANTS ---
const fadeInOnScroll = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      type: 'spring',
      stiffness: 100
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};


// --- HOMEPAGE COMPONENT ---
const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  
  const smartToolsRef = useRef(null);
  const experienceRef = useRef(null);
  
  const isSmartToolsInView = useInView(smartToolsRef, { once: true, amount: 0.2 });
  const isExperienceInView = useInView(experienceRef, { once: true, amount: 0.3 });

  // Auto-rotate testimonials
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter logic here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <>
      {/* ===== 1. HERO SECTION WITH GLASSMORPHISM + ADVANCED ANIMATIONS ===== */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 pt-36">
        <WarpBackground />

        {/* Hero Content with Parallax Layers */}
        <div className="relative z-10 container mx-auto h-[600px] lg:h-[750px] flex flex-col items-center justify-center text-center text-white px-4">
          
          {/* Cinematic Title with Stagger */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-outfit"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="text-white/50">Your World, Redefined</span>
              <br />
              <span className="text-white/90">in the Clouds With </span>
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                OnWings
              </span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Experience premium flight booking with the Best Options and seamless journeys
            </motion.p>
          </motion.div>

          {/* Glassmorphism Search Panel with 3D Tilt */}
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.8,
              type: 'spring',
              stiffness: 80
            }}
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl shadow-black/40 hover:shadow-red-600/30 transition-all duration-500">
              {/* Inner depth highlight layer */}
              <div className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none" />
              
              {/* Form content */}
              <div className="relative z-10">
                <FlightSearchForm />
              </div>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="mt-12 flex gap-8 flex-wrap justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { icon: <Users className="w-5 h-5" />, label: '1M+ Travelers' },
              { icon: <Globe className="w-5 h-5" />, label: '150+ Destinations' },
              { icon: <Clock className="w-5 h-5" />, label: '24/7 Support' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 text-white/80 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                variants={floatingAnimation}
                animate="animate"
                transition={{ delay: idx * 0.2 }}
              >
                {stat.icon}
                <span className="text-sm font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== 2. "WHY CHOOSE US" (FEATURES) SECTION WITH PREMIUM CARDS ===== */}
      <section className="container mx-auto py-24 px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
            Why Choose OnWings
          </Badge>
          <h2 className="text-black text-4xl md:text-5xl font-bold mb-4">
            Explore Various Options
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Premium features designed to make your travel experience seamless and memorable
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, type: 'spring', stiffness: 300 }
              }}
            >
              <Card className="h-full bg-gradient-to-br from-red-50 to-white border-red-100 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 group">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-slate-800 group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== 3. "POPULAR DESTINATIONS" SECTION WITH CINEMATIC PARALLAX ===== */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
              Travel Destinations
            </Badge>
            <h2 className="text-black text-4xl md:text-5xl font-bold mb-4">
              Popular Destinations
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Discover amazing places around the world at unbeatable prices
            </p>
          </motion.div>
          
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ExpandingGallery items={popularDestinations} />
          </motion.div>
        </div>
      </section>

      

      {/* ===== 5. AIRLINES WE PARTNER WITH SECTION ===== */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-3">
              Trusted Airline Partners
            </h2>
            <p className="text-slate-600">
              We work with the world's leading airlines
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {partnerAirlines.map((airline, index) => (
              <motion.div
                key={airline.name}
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.2,
                  filter: 'grayscale(0%)',
                  transition: { duration: 0.3 }
                }}
                className="text-6xl grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2">
                  <span>{airline.logo}</span>
                  <span className="text-xs text-slate-600 font-medium">{airline.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 6. TESTIMONIALS CAROUSEL SECTION ===== */}
      <section className="container mx-auto py-24 px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm">
            <Star className="w-3 h-3 inline mr-2 fill-yellow-500 text-yellow-500" />
            Customer Stories
          </Badge>
          <h2 className="text-black text-4xl md:text-5xl font-bold mb-4">
            Loved by Travelers Worldwide
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-red-500 mb-6" />
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-3xl">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-slate-600">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-red-500 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. ONWINGS EXPERIENCE BRANDING SECTION ===== */}
      <section ref={experienceRef} className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={isExperienceInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm bg-white/10 text-white border-white/20">
                  <Plane className="w-3 h-3 inline mr-2" />
                  The OnWings Experience
                </Badge>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                variants={fadeInUp}
              >
                Redefining Air Travel,
                <br />
                <span className="text-red-400">One Flight at a Time</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-slate-300 mb-8 leading-relaxed"
                variants={fadeInUp}
              >
                We're not just a booking platform—we're your travel companion. 
                From AI-powered predictions to 24/7 support, every feature is designed 
                to make your journey smoother, smarter, and more memorable.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Button 
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={isExperienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 space-y-6">
                  {[
                    { label: 'Happy Travelers', value: '1M+', icon: <Users className="w-6 h-6" /> },
                    { label: 'Destinations', value: '150+', icon: <Globe className="w-6 h-6" /> },
                    { label: 'Flights Booked', value: '5M+', icon: <Plane className="w-6 h-6" /> },
                    { label: 'Customer Rating', value: '4.9★', icon: <Star className="w-6 h-6" /> },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isExperienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-red-400">
                          {stat.icon}
                        </div>
                        <span className="text-slate-300">{stat.label}</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 8. NEWSLETTER CTA SECTION ===== */}
      <section className="container mx-auto py-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-red-50 via-white to-blue-50 border-slate-200 shadow-2xl overflow-hidden">
            <div className="relative">
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
              
              <CardContent className="relative p-8 md:p-12 text-center">
                <motion.div
                  variants={floatingAnimation}
                  animate="animate"
                >
                  <Mail className="w-16 h-16 text-red-500 mx-auto mb-6" />
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Stay Updated with Exclusive Deals
                </h2>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get the best flight deals, travel tips, 
                  and exclusive offers delivered to your inbox.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/80 backdrop-blur-sm border-slate-300 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                  <Button 
                    type="submit"
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 text-white px-8"
                  >
                    Subscribe
                  </Button>
                </form>

                <p className="text-sm text-slate-500 mt-4">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </section>
    </>
  )
}

export default HomePage