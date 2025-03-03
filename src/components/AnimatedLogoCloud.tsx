// src/app/(main)/project-collection/[name]/AnimatedLogoCloud.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { url: '/Y1SlBye7bzROKCM4Z8mb5VbHg.avif' },
    { url: '/Vxz3I7vSm7BfUriKNWDn6GkGDU.avif' },
    { url: '/TTdNsUIJ7hNa3fW196hmNHfRznM.png' },
    { url: '/fpSz08cqO9CONW7pXT8QyafavKA_1.png' },
    { url: '/ClPv4MxK9a7IemxIhEl4txbDyA4.avif' },
];

const LOGO_IMAGE_WIDTH = 448;
const LOGO_IMAGE_HEIGHT = 400;

export default function AnimatedLogoCloud() {
    return (
        <div className="w-full py-12">
            <div className="mx-auto w-full px-4 md:px-8">
                <div className="group relative mt-6 flex gap-6 overflow-hidden p-2">
                    <motion.div
                        animate={{ translateX: '-50%' }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
                        className="flex shrink-0 flex-row justify-around gap-2 pr-6"
                    >
                        {logos.map((logo, i) => (
                            <img
                                key={i}
                                src={logo.url}
                                width={LOGO_IMAGE_WIDTH}
                                height={LOGO_IMAGE_HEIGHT}
                                className="h-[25rem] w-[28rem] object-cover dark:brightness-0 dark:invert"
                                alt={`Logo ${i + 1}`}
                            />
                        ))}
                        {logos.map((logo, i) => (
                            <img
                                key={`second-${i}`}
                                src={logo.url}
                                width={LOGO_IMAGE_WIDTH}
                                height={LOGO_IMAGE_HEIGHT}
                                className="h-[25rem] w-[28rem] object-cover dark:brightness-0 dark:invert"
                                alt={`Logo ${i + 1}`}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}