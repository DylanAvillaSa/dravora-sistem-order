import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaImages } from "react-icons/fa";

export default function ProductScroll({ filteredProducts, cart, addToCart }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // AUTO SCROLL PAS LOAD
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setTimeout(() => {
      el.scrollBy({ left: 80, behavior: "smooth" });

      setTimeout(() => {
        el.scrollBy({ left: -80, behavior: "smooth" });
      }, 600);
    }, 500);
  }, []);

  // HANDLE SCROLL → UPDATE DOT
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.round(el.scrollLeft / (el.offsetWidth * 0.48));
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      {/* TEXT HINT */}
      <p className="text-xs text-gray-400 mb-2">
        Geser untuk lihat menu lainnya →
      </p>

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth"
      >
        {filteredProducts.map((item, index) => {
          const inCart = cart.find((i) => i.id === item.id);

          return (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => addToCart(item)}
              className="snap-start cursor-pointer min-w-[60%] border border-gray-200 rounded-3xl p-3 flex flex-col justify-between items-center hover:border-red-500 transition shadow-md bg-white relative"
            >
              <div className="w-full text-center relative">
                <div className="h-40 w-full rounded-2xl object-cover mb-2 bg-gray-300 flex items-center  justify-center">
                  <FaImages className="text-gray-400" size={40} />
                </div>
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
                    {item.badge}
                  </span>
                )}
                {inCart && (
                  <span className="absolute top-3 right-3 bg-white text-red-600 font-bold px-2 py-1 rounded-full text-sm shadow">
                    {inCart.qty}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-col items-center gap-1">
                <p className="font-bold text-gray-900 text-center">
                  {item.name}
                </p>
                <p className="text-sm text-gray-800">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FADE RIGHT */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent" />

      {/* ARROW ANIMATION */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full px-2 py-1 text-gray-600 text-xs"
      >
        →
      </motion.div>

      {/* DOT INDICATOR */}
      <div className="flex justify-center mt-3 gap-2">
        {filteredProducts.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              activeIndex === i ? "w-5 bg-black" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
