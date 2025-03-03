"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { MovingImage } from "../MovingImage";
import { ExploreHeader } from "../ExploreHeader";
import { ExploreJournal } from "../ExploreJournal";


const images = [
  { src: "/RuMqGgeq1yJlrDGasQTyq8Ii9I.avif", x: ["0%", "-70%"], y: ["0%", "-80%"], scale: 0.4 },
  { src: "/crJj3iMRi3dvubY72RgxD8cqk.webp", x: ["0%", "-130%"], y: ["0%", "-50%"], scale: 0.5 },
  { src: "/a05ujhizOPDPooqqTlXCk6gkRI.webp", x: ["0%", "-100%"], y: ["0%", "20%"], scale: 0.6 },
  { src: "/Vxz3I7vSm7BfUriKNWDn6GkGDU.avif", x: ["0%", "-50%"], y: ["0%", "70%"], scale: 0.3 },
  { src: "/j0euBdQBaziuZU28aRIRCvaX28.webp", x: ["0%", "70%"], y: ["0%", "-90%"], scale: 0.3 },
  { src: "/6mVf040uObmMYQk0MdjLSZvyx6U.avif", x: ["0%", "130%"], y: ["0%", "-30%"], scale: 0.7 },
  { src: "/OrrgufLqjfZi9vZsEUQQEHmWXLA.avif", x: ["0%", "40%"], y: ["0%", "70%"], scale: 0.4 },
  { src: "/DErGBXCKfVwGZjfxm4iDjYawu9s.avif", x: ["0%", "100%"], y: ["0%", "40%"], scale: 0.5 },
];

export default function ExploreSections() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <section>
      <div ref={ref} className="w-full relative h-[400vh]">
        <div className="h-screen sticky top-0 left-0 flex items-center justify-center overflow-hidden">
          {images.map((pos, index) => (
            <MovingImage key={index} src={pos.src} xRange={pos.x} yRange={pos.y} scaleRange={pos.scale} scrollYProgress={scrollYProgress} />
          ))}
          <ExploreHeader scrollYProgress={scrollYProgress} />
        </div>
      </div>
      <ExploreJournal />
    </section>
  );
}
