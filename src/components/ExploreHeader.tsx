"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface ExploreHeaderProps {
  scrollYProgress: MotionValue<number>;
}

export function ExploreHeader({ scrollYProgress }: ExploreHeaderProps) {
  const scalecenter = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacitycenter = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scale: scalecenter, opacity: opacitycenter }}
      transition={{ duration: 0.5, ease: "easeInOut", stiffness: 200, type: "spring" }}
      className="w-[27rem]"
    >
      <h1 className="text-[66px] font-bold tracking-[-0.01em] leading-[1em] text-center text-[rgb(102,79,53)]">
        Designing Excellence Worldwide
      </h1>
      <p className="tracking-[-0.02em] font-semibold text-center mt-5 text-[rgb(170,136,103)]">
        A global leader in high-end architecture, known for our commitment to excellence, sustainability, and transformative designs that inspire and endure.
      </p>
    </motion.div>
  );
}
