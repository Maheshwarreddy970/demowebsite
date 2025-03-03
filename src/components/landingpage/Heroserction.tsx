"use client";

import { Icons } from "@/icons";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface HeroContent {
  backgroundVideo: string;
  foregroundVideo: string;
  title: string;
  description: string;
  buttonLink: string;
}

export default function Heroserction() {
  const [content, setContent] = useState<HeroContent>({
    backgroundVideo: "/b0MCHKyxCogsLlrolRnEnoL01I.mp4", // Default fallback
    foregroundVideo: "/b0MCHKyxCogsLlrolRnEnoL01I.mp4", // Default fallback
    title: "The Meadow House",
    description: "The Meadow House by Mark English Architects draws on Californian and Korean influences",
    buttonLink: "/project-collection/the-meadow-house",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch content from Firestore on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "websiteContent", "heroSection");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as HeroContent);
        } else {
          console.log("No such document, using defaults.");
        }
      } catch (error) {
        console.error("Error fetching hero section content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden font-semibold">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={content.backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Foreground Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut", stiffness: 100 }}
        className="overflow-hidden z-20 max-w-xs h-[50vh] md:max-w-md md:h-[80vh] bg-[rgba(102,79,53,0.41)] w-full opacity-100 backdrop-blur-md p-4"
      >
        <div className="relative w-full h-[75%] md:h-[82%] overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={content.foregroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Link
            href={content.buttonLink}
            className="text-nowrap font-semibold flex items-center justify-center gap-2 bg-[rgb(237,233,207)] rounded-[22px] opacity-100 absolute bottom-10 left-1/2 translate-x-[-50%] py-3 px-6 hover:text-white hover:bg-[rgb(170,136,103)] text-[14px] text-center hover:fill-white fill-[rgb(102,79,53)] text-[rgb(102,79,53)]"
          >
            <Icons.ButtonIcon className="size-5" />
            Get Started
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-[32px] font-semibold mt-1.5 text-center text-[rgb(237,233,207)]">
          {content.title}
        </h1>

        {/* Description */}
        <p className="text-md md:text-[14px] font-semibold text-left text-[rgb(237,233,207)]">
          {content.description}
        </p>
      </motion.div>
    </section>
  );
}