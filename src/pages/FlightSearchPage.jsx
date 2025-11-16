import React, { useMemo, useRef } from "react";
import FlightSearchForm from "../components/flight/FlightSearchForm";
import { motion, useScroll, useTransform } from "framer-motion";
import AirplaneImg from "../assets/hero-airplane-right.jpg";

const FlightSearchPage = () => {
  const title = useMemo(() => "WHERE TO FLY?".split(""), []);

  // parallax for airplane visual
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const planeY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const planeX = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div className="w-full">
      {/* Hero Header Section */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 pb-28"
      >
        {/* Subtle spotlight accent behind left column */}
        <div className="pointer-events-none absolute -inset-x-32 top-10 h-48 bg-gradient-to-t from-white/80 to-transparent rounded-xl opacity-70 blur-md" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
            <div className="lg:col-span-6 text-center lg:text-left">
              <motion.h1
                className="font-outfit font-extrabold leading-tight text-4xl md:text-6xl text-slate-900"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 1 },
                  visible: { 
                    transition: { 
                      staggerChildren: 0.04,
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.8,
                      ease: "easeInOut"
                    } 
                  },
                }}
              >
                {title.map((ch, i) => (
                  <motion.span
                    key={i}
                    variants={{ 
                      hidden: { opacity: 0.3, y: 18 }, 
                      visible: { opacity: 1, y: 0 } 
                    }}
                    transition={{ 
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.8,
                      ease: "easeInOut"
                    }}
                    className={ch === " " ? "inline-block w-2" : "inline-block"}
                  >
                    {ch}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="mt-4 text-slate-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Find countless flights options & deals to various destinations around the world.
              </motion.p>
            </div>

            {/* Airplane Visual */}
            <div className="lg:col-span-6 relative">
              <motion.img
                src={AirplaneImg}
                alt="Airplane side view"
                role="img"
                loading="lazy"
                className="w-full max-w-[640px] mx-auto lg:mx-0 rounded-2xl shadow-xl shadow-slate-300/40"
                style={{ y: planeY, x: planeX }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Form Section  */}
      <div className="max-w-[760px] mx-auto px-4 mt-16 mb-24">
        <motion.div
          className="w-full bg-white rounded-xl shadow-2xl border border-slate-200 p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FlightSearchForm />
        </motion.div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
