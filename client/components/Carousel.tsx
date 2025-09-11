import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  src: string;
  quote?: string;
}

const Carousel: React.FC<{ slides: Slide[]; interval?: number }> = ({ slides, interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length, interval]);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x, y });
  };

  return (
    <div ref={containerRef} onMouseMove={onMove} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="wait">
          {slides.map((s, i) =>
            i === index ? (
              <motion.div
                key={s.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0"
              >
                <motion.img
                  src={s.src}
                  alt={s.quote || "slide"}
                  className="w-full h-full object-cover"
                  style={{
                    transform: `translate3d(${pointer.x * 12}px, ${pointer.y * 8}px, 0)`,
                    filter: "brightness(0.65)",
                  }}
                />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence initial={false} mode="wait">
            <motion.h1
              key={slides[index].quote}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg"
            >
              {slides[index].quote}
            </motion.h1>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-8">
            <a href="/get-involved/volunteer" className="px-8 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 font-medium">Join Us Today</a>
            <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-charity-neutral-800 rounded-lg transition-colors duration-200 font-medium">Donate Now</button>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200">
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={cn("w-3 h-3 rounded-full transition-colors duration-200", i === index ? "bg-white scale-110" : "bg-white/50")} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
