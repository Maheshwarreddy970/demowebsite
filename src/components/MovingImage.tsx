"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface MovingImageProps {
    src: string;
    xRange: string[];
    yRange: string[];
    scaleRange: number;
    scrollYProgress: MotionValue<number>;
}

export function MovingImage({ src, xRange, yRange, scaleRange, scrollYProgress }: MovingImageProps) {
    const x = useTransform(scrollYProgress, [0, 1], xRange);
    const y = useTransform(scrollYProgress, [0, 1], yRange);
    const scale = useTransform(scrollYProgress, [0, 1], [1, scaleRange]);

    return (
        <motion.div style={{ scale, x, y }} className="absolute z-40 h-[27rem] w-[27rem] overflow-hidden">
            <img width={40} height={40} className="object-cover h-full w-full" src={src} alt="image" />
        </motion.div>
    );
}
