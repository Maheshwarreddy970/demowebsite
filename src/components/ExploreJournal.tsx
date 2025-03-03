"use client";

import { motion } from "framer-motion";
import { Icons } from "@/icons";
import data from "@/lib/data.json";
import { TextAnimate } from "./ui/text-animate";
import JournalComponent from "./JournalComponent";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export function ExploreJournal() {
  type Journal = {
    name: string;
    title: string;
    titleimg: string;
    href: string;
    smartHomesAndBuildings: {
      title: string;
      sections: { name: string; description: string }[];
    }[];
    img?: string;
  };

  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {selectedJournal ? (
          <JournalComponent
            key="journal-page"
            journal={selectedJournal}
            onBack={() => setSelectedJournal(null)}
            setSelectedJournal={setSelectedJournal} // Pass the setter function
          />
        ) : (
          <div
            key="explore-journal"
            className="bg-[#3e362e] flex flex-col gap-3 py-[9.75rem] px-4 overflow-hidden w-full lg:px-[2.5rem]"
          >
            <TextAnimate
              animation="slideLeft"
              className="text-[112px] tracking-[-6.8px] leading-[1em] text-[#AA8867] text-center"
            >
              Explore Journal
            </TextAnimate>
            <TextAnimate
              animation="fadeIn"
              by="line"
              as="p"
              className="text-[1.5rem] max-w-2xl mx-auto tracking-[-0.0375rem] text-center text-[rgb(170,136,103)]"
            >
              Highlights of cases that we passionately built with forward-thinking clients and friends over the years.
            </TextAnimate>
            <div className="grid lg:grid-cols-3 lg:px-10 gap-6 mt-10">
              {data.ExploreJournal.journal.map((article, index) => (
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.2,
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 200,
                  }}
                  key={index}
                  className="bg-white p-4"
                >
                  <div className="w-full h-[24.25rem]">
                    <motion.img
                    alt="journal"
                      src={article.titleimg}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-[22px] mt-5 leading-7 text-left">
                    {article.title}
                  </h1>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedJournal(article);
                    }}
                    className="text-[14px] mt-7 text-[#333333] text-left flex gap-3 items-center cursor-pointer"
                  >
                    <Icons.ButtonIcon className="size-[1.12rem]" />
                    Read
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}