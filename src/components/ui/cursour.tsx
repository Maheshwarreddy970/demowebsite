"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <motion.div
      className="fixed w-4 h-4 bg-[rgb(219,176,132)] rounded-full pointer-events-none z-[9999]"
      animate={{ x: cursor.x - 6, y: cursor.y - 6 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    />
  );
}
