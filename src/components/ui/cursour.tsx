"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only run this effect on the client side
    const updateCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []); // Empty dependency array since we only need this to run once

  // Render the component regardless of client/server context
  return (
    <motion.div
      className="fixed w-4 h-4 bg-[rgb(219,176,132)] rounded-full pointer-events-none z-[9999]"
      animate={{ x: cursor.x - 6, y: cursor.y - 6 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      initial={{ x: 0, y: 0 }} // Add initial position to prevent undefined state
    />
  );
}